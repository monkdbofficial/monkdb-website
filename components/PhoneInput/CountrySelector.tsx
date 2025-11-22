"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import type { CountryCode } from 'libphonenumber-js';
import en from 'react-phone-number-input/locale/en.json';
import { ChevronDown, Search } from "lucide-react";

interface CountrySelectorProps {
  value: string;
  onChange: (country: string) => void;
  className?: string;
  variant?: 'rounded' | 'pill'; // rounded-lg or rounded-full
}

const CountrySelector = ({ value, onChange, className = "", variant = 'rounded' }: CountrySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const countries = getCountries();

  // Determine border radius based on variant
  const borderRadius = variant === 'pill' ? 'rounded-full' : 'rounded-lg';

  // Popular countries to show at top
  const popularCountries = ['IN', 'US', 'GB', 'CA', 'AU', 'AE', 'SG'];

  const getFlag = (countryCode: string) => {
    return String.fromCodePoint(...[...countryCode].map(c => c.charCodeAt(0) + 127397));
  };

  const filteredCountries = countries.filter(country => {
    if (!search.trim()) return true; // Show all if no search

    const countryName = en[country]?.toLowerCase() || '';
    const countryCode = getCountryCallingCode(country);
    const searchLower = search.toLowerCase().trim();

    // Search by country name or calling code
    return countryName.includes(searchLower) ||
           countryCode.includes(searchLower) ||
           `+${countryCode}`.includes(searchLower);
  });

  // Separate popular and other countries
  const popular = search.trim()
    ? [] // Don't show popular section when searching
    : filteredCountries.filter(c => popularCountries.includes(c));
  const others = search.trim()
    ? filteredCountries // Show all results when searching
    : filteredCountries.filter(c => !popularCountries.includes(c));

  // Update dropdown position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: 320, // Fixed width for dropdown
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: string) => {
    onChange(country);
    setIsOpen(false);
    setSearch("");
  };

  const selectedFlag = getFlag(value);
  const selectedCode = getCountryCallingCode(value);

  const dropdown = isOpen && typeof window !== 'undefined' ? createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
      }}
      className="z-[9999] rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
          {/* Search Input */}
          <div className="border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or code (e.g., India, +91)"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-600">
            {/* Popular Countries */}
            {!search && popular.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Popular
                </div>
                {popular.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      value === country ? 'bg-primary/5 text-primary dark:bg-primary/10' : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="text-lg leading-none">{getFlag(country)}</span>
                    <span className="flex-1 font-medium">{en[country]}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">+{getCountryCallingCode(country)}</span>
                  </button>
                ))}
                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
              </>
            )}

            {/* Other Countries / Search Results */}
            {others.length > 0 && (
              <>
                {!search ? (
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    All Countries
                  </div>
                ) : (
                  <div className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                    Found {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
                  </div>
                )}
                {others.map((country) => {
                  const countryName = en[country];
                  const callingCode = getCountryCallingCode(country);
                  const searchLower = search.toLowerCase();

                  // Highlight matching text
                  const nameMatch = countryName.toLowerCase().includes(searchLower);
                  const codeMatch = callingCode.includes(searchLower) || `+${callingCode}`.includes(searchLower);

                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => handleSelect(country)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                        value === country ? 'bg-primary/5 text-primary dark:bg-primary/10' : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <span className="text-lg leading-none">{getFlag(country)}</span>
                      <span className={`flex-1 ${nameMatch && search ? 'font-semibold' : 'font-medium'}`}>
                        {countryName}
                      </span>
                      <span className={`text-xs ${codeMatch && search ? 'font-bold text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                        +{callingCode}
                      </span>
                    </button>
                  );
                })}
              </>
            )}

            {/* No Results */}
            {filteredCountries.length === 0 && (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No countries found</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Try a different search term</p>
              </div>
            )}
          </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button - Matching form field style */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-full w-full items-center justify-between gap-1.5 ${borderRadius} border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:outline-none dark:border-strokedark dark:bg-gray-800 dark:text-white dark:focus:border-blue-500`}
      >
        <span className="flex items-center gap-1">
          <span className="text-base leading-none">{selectedFlag}</span>
          <span className="font-normal">+{selectedCode}</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown rendered in portal */}
      {dropdown}
    </div>
  );
};

export default CountrySelector;

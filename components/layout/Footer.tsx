import React from "react";
import {
  Phone,
  Smartphone,
  Printer,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full rounded-t-3xl border-t border-slate-200/70 bg-white/95 px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="md:flex-1">
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Contact
            </h4>
            <ul className="text-sm text-slate-700 space-y-3">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Phone size={16} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">Phone</div>
                  <a
                    href="tel:+251581110634"
                    className="text-slate-900 font-medium"
                  >
                    +251 58 111 0634
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Smartphone size={16} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">
                    Alternative Mobile
                  </div>
                  <a
                    href="tel:+251912679216"
                    className="text-slate-900 font-medium"
                  >
                    +251 912 679 216
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Printer size={16} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">Fax</div>
                  <div className="text-slate-900 font-medium">
                    +251 58 111 1920
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="md:flex-1">
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Address
            </h4>
            <div className="text-sm text-slate-700 space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 mt-1">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">Postal</div>
                  <div className="text-slate-900 font-medium">
                    P.O. Box 182, Gonder, Ethiopia 6200
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 mt-1">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="text-xs text-slate-500">Physical</div>
                  <div className="text-slate-900 font-medium">
                    Hilltop Ridge Area, Gondar, Amhara Region, Ethiopia
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex-1">
            <h4 className="mb-2 text-lg font-semibold text-slate-900">
              Connect
            </h4>
            <ul className="text-sm text-slate-700 space-y-3">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Globe size={16} />
                </span>
                <a
                  className="text-slate-900 font-medium underline"
                  href="https://www.instagram.com/explore/locations/284825813/goha-hotel-gondar-ethiopie/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram — Goha Hotel Gondar
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <ExternalLink size={16} />
                </span>
                <a
                  className="text-slate-900 font-medium underline"
                  href="https://web.facebook.com/p/Goha-Hotel-%E1%8C%8E%E1%88%83-%E1%88%86%E1%89%B4%E1%88%8D-100063693654371/?_rdc=1&_rdr"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100/60 pt-6 text-sm text-slate-500">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div>
              © {new Date().getFullYear()} GohaHotel — All rights reserved.
            </div>
            <div className="text-xs text-slate-400">
              P.O. Box 182 • Gondar • Ethiopia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

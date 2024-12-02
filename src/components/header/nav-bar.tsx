import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className=" bg-gray-50 dark:bg-gray-700 ">
      <div className="w-4/5 mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
            <li>
              <Link
                to="/"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/historique"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Historique
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

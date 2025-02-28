import React from 'react'

export default function footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="flex justify-center items-center h-16 bg-gray-800 text-white mt-4">
                <p className="text-center">
                    &copy; {year} King Formula | API <a href="https://ergast.com" target='_blank'>Ergast</a> - Réalisé par <a href="https://www.noahbuisson.fr" target="_blank">Noah Buisson</a>
                </p>
            </div>
        </footer>
    )
}

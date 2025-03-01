import React from 'react'

export default function footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="flex justify-center items-center h-16 bg-base-300 text-white mt-16">
                <p className="text-center text-black">
                    &copy; {year} King Formula | API <a className='hover:underline hover:text-base-100' href="https://ergast.com" target='_blank'>Ergast</a> - Réalisé par <a className='hover:underline hover:text-base-100' href="https://www.noahbuisson.fr" target="_blank">Noah Buisson</a>
                </p>
            </div>
        </footer>
    )
}

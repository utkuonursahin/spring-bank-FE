export default function Sidebar() {
    return (
        <aside className="w-64 bg-white p-6 hidden md:block">
            <nav className="space-y-4">
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    Dashboard
                </a>
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    Accounts
                </a>
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    Transactions
                </a>
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    Investments
                </a>
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    Settings
                </a>
            </nav>
        </aside>
    );
}

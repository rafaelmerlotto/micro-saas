import Header from '../components/Header';
import Feed from '../components/Feed';
import Footer from '../components/Footer';

export default function Dashboard() {


    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="md:max-w-7xl md:mx-auto md:px-6 py-30">
                <div className="rounded-2xl border border-gray-200 bg-white md:p-6">
                    <Feed />
                </div>
            </main>
            <Footer />
        </div>
    )
}

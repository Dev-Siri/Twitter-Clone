import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#14171a] text-gray-400 p-16">
      <div className="flex justify-around">
        <section>
          <h3 className="font-bold mb-4">Twitter platform</h3>
          <Link href="/" className="leading-relaxed">
            twitter.com
          </Link>
          <p className="leading-relaxed">Status</p>
          <p className="leading-relaxed">Accessibility</p>
          <p className="leading-relaxed">Embed a tweet</p>
          <p className="leading-relaxed">Privacy Center</p>
          <p className="leading-relaxed">Transparency Center</p>
          <p className="leading-relaxed">Download the Twitter app</p>
        </section>
        <section>
          <h3 className="font-bold mb-4">Twitter Inc</h3>
          <p className="leading-relaxed">About the company</p>
          <p className="leading-relaxed">Company news</p>
          <p className="leading-relaxed">Brand toolkit</p>
          <p className="leading-relaxed">Jobs and Internships</p>
          <p className="leading-relaxed">Investors</p>
        </section>
        <section>
          <h3 className="font-bold mb-4">Help</h3>
          <p className="leading-relaxed">Help Center</p>
          <p className="leading-relaxed">Using Twitter</p>
          <p className="leading-relaxed">Twitter for creators</p>
          <p className="leading-relaxed">Ads Help Center</p>
          <p className="leading-relaxed">Managing your account</p>
          <p className="leading-relaxed">Email Preference Center</p>
          <p className="leading-relaxed">Rules and policies</p>
          <p className="leading-relaxed">Contact us</p>
        </section>
        <section>
          <h3 className="font-bold mb-4">Developer resources</h3>
          <p className="leading-relaxed">Developer home</p>
          <p className="leading-relaxed">Documentation</p>
          <p className="leading-relaxed">Forums</p>
          <p className="leading-relaxed">Communities</p>
          <p className="leading-relaxed">Developer blog</p>
          <p className="leading-relaxed">Engineering blog</p>
          <p className="leading-relaxed">Developer terms</p>
        </section>
        <section>
          <h3 className="font-bold mb-4">Business resources</h3>
          <p className="leading-relaxed">Advertise</p>
          <p className="leading-relaxed">Twitter for business</p>
          <p className="leading-relaxed">Resources and guides</p>
          <p className="leading-relaxed">Twitter for marketers</p>
          <p className="leading-relaxed">Marketing insights</p>
          <p className="leading-relaxed">Brand inspiration</p>
          <p className="leading-relaxed">Twitter Flight School</p>
        </section>
      </div>
      <section className="flex gap-40 ml-10 mt-10">
        <p>© 2023 Twitter Inc.</p>
        <p>Cookies</p>
        <p>Privacy</p>
        <p>Terms and conditions</p>
        <p>English</p>
      </section>
    </footer>
  );
}

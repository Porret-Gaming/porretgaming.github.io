// src/pages/contact.js
import NavBar from '../components/NavBar'; // Import the NavBar component
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactPage() {
  return (
    <div>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/images/general/PorretGaming_Logo_cut.png" />
      </Head>
      <NavBar />
      <main className="container mt-5">
        <h1>Contact Us</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </main>
    </div>
  );
}

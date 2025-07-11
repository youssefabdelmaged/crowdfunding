import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
      {/* Newsletter Section */}
      <div className="newsletter-section" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2>Join Our Campaigns</h2>
        <p>Be a part of change. Subscribe to get updates on inspiring fundraising campaigns and success stories.</p>
        <div className="divider" style={{ height: '2px', background: '#ccc', margin: '20px auto', width: '100px' }}></div>
      </div>

      {/* Footer Content */}
      <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        
        {/* Navigation Links */}
        <div className="navigation">
          <h3>Navigate</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>About Crowdfunding</li>
            <li>Explore Campaigns</li>
            <li>Start a Project</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Info Table */}
        <div className="info-table">
          <table>
            <thead>
              <tr>
                <th>Resources</th>
                <th>Categories</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>How It Works</td>
                <td>Education</td>
                <td>123 Fundrise St.<br />Cairo, Egypt</td>
              </tr>
              <tr>
                <td>Success Stories</td>
                <td>Health</td>
                <td>support@crowdfundapp.com</td>
              </tr>
              <tr>
                <td>Community Guidelines</td>
                <td>Technology</td>
                <td>+20 100 123 4567</td>
              </tr>
              <tr>
                <td>FAQs</td>
                <td>Non-Profit</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright" style={{ textAlign: 'center', marginTop: '30px', color: '#6c757d' }}>
        <p>© 2025 Crowdfunding App. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

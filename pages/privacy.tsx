import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./privacy.module.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Notice — 2Read",
  description:
    "Privacy Notice for 2Read — how we collect, use, and protect your personal information.",
  url: "https://2read.app/privacy",
  publisher: {
    "@type": "Organization",
    name: "2Read",
  },
};

export default function PrivacyPage() {
  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Privacy Notice — 2Read</title>
        <meta
          name="description"
          content="Privacy Notice for 2Read — how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://2read.app/privacy" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>

        <h1 className={styles.pageTitle}>Privacy Notice</h1>
        <p className={styles.lastUpdated}>Last updated: January 1, 2026</p>

        <div className={styles.body}>
          <p>
            This privacy notice for 2Read ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services").
          </p>
          <p>
            Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services.
          </p>

          <hr className={styles.divider} />

          <h2 className={styles.sectionTitle}>Summary of Key Points</h2>

          <p>
            This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
          </p>

          <h3 className={styles.sectionSubtitle}>What personal information do we collect?</h3>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>

          <h3 className={styles.sectionSubtitle}>Personal Information from Google Play Primary Account</h3>
          <p>
            When you sign in with Google Play, we collect your email address, account name, and profile picture from your associated Google Play 'Primary Account'. This is considered your Primary Account information per Google's definitions.
          </p>

          <h3 className={styles.sectionSubtitle}>Do we process any sensitive personal information?</h3>
          <p>We do not process sensitive personal information.</p>

          <h3 className={styles.sectionSubtitle}>Do we receive any information from third parties?</h3>
          <p>
            We may receive information from public databases, marketing partners, social media platforms, and other outside sources.
          </p>

          <h3 className={styles.sectionSubtitle}>How do we process your information?</h3>
          <p>
            We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.
          </p>

          <h3 className={styles.sectionSubtitle}>Processing of Google Play Primary Account Information</h3>
          <ol>
            <li>Your Primary Account email is used to create, identify and manage your user account.</li>
            <li>Your Primary Account name and picture are displayed on your profile and used to represent your identity and personalize your in-app experience.</li>
          </ol>

          <h3 className={styles.sectionSubtitle}>In what situations and with which parties do we share personal information?</h3>
          <p>
            We may share information in specific situations and with specific third parties.
          </p>

          <h3 className={styles.sectionSubtitle}>What are your rights?</h3>
          <p>
            Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
          </p>

          <h3 className={styles.sectionSubtitle}>How do you exercise your rights?</h3>
          <p>
            The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
          </p>

          <hr className={styles.divider} />

          <h2 className={styles.sectionTitle}>Table of Contents</h2>
          <ol className={styles.toc}>
            <li><a href="#section-1">What Information Do We Collect?</a></li>
            <li><a href="#section-2">How Do We Process Your Information?</a></li>
            <li><a href="#section-3">Data Collection and Safety</a></li>
            <li><a href="#section-4">Do We Use Cookies and Other Tracking Technologies?</a></li>
            <li><a href="#section-5">How Do We Handle Your Social Logins?</a></li>
            <li><a href="#section-6">Is Your Information Transferred Internationally?</a></li>
            <li><a href="#section-7">How Long Do We Keep Your Information?</a></li>
            <li><a href="#section-8">Do We Collect Information from Minors?</a></li>
            <li><a href="#section-9">What Are Your Privacy Rights?</a></li>
            <li><a href="#section-10">Controls for Do-Not-Track Features</a></li>
            <li><a href="#section-11">Affiliate Links and Commissions</a></li>
            <li><a href="#section-12">AI-Powered Features and Data Usage</a></li>
            <li><a href="#section-13">Do We Make Updates to This Notice?</a></li>
            <li><a href="#section-14">How Can You Review, Update, or Delete the Data We Collect from You?</a></li>
          </ol>

          <hr className={styles.divider} />

          {/* Section 1 */}
          <h2 id="section-1" className={styles.sectionTitle}>1. What Information Do We Collect?</h2>

          <h3 className={styles.sectionSubtitle}>Personal information you disclose to us</h3>
          <p className={styles.inShort}>In Short: We collect personal information that you provide to us.</p>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>
          <p>
            Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
          </p>
          <ol>
            <li>Names</li>
            <li>Email addresses</li>
          </ol>

          <h3 className={styles.sectionSubtitle}>Personal Information from Google Play Primary Account</h3>
          <p>
            When you sign in or link your Google Play account with our app, we collect certain information from the Google Play "Primary Account" associated with your Google credentials. This includes your email address, account name, and profile picture. This data is considered your "Primary Account" information per Google's definitions.
          </p>

          <p>
            <strong>Sensitive Information.</strong> When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
          </p>
          <p>
            <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Google Play Store and App Store. You may find their privacy notice link(s) here: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a> and <a href="https://www.apple.com/legal/privacy/en-ww/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/en-ww/</a>.
          </p>
          <p>
            <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called "How Do We Handle Your Social Logins?" below.
          </p>

          <h3 className={styles.sectionSubtitle}>Application Data</h3>
          <p>If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</p>
          <ol>
            <li><strong>Mobile Device Access.</strong> We may request access or permission to certain features from your mobile device, including your mobile device's storage, camera, and other features. If you wish to change our access or permissions, you may do so in your device's settings.</li>
            <li><strong>Push Notifications.</strong> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.</li>
          </ol>
          <p>
            This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
          </p>
          <p>
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
          </p>

          <h3 className={styles.sectionSubtitle}>Information automatically collected</h3>
          <p className={styles.inShort}>
            In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
          </p>
          <p>
            We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
          </p>
          <p>
            Like many businesses, we also collect information through cookies and similar technologies.
          </p>

          <hr className={styles.divider} />

          {/* Section 2 */}
          <h2 id="section-2" className={styles.sectionTitle}>2. How Do We Process Your Information?</h2>
          <p className={styles.inShort}>
            In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
          </p>
          <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
          <ul>
            <li><strong>To facilitate account creation and authentication</strong> and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
            <li><strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
            <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
            <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
          </ul>

          <h3 className={styles.sectionSubtitle}>Processing of Google Play Primary Account Information</h3>
          <p>We process the Personal Information from your Google Play Primary Account in the following ways:</p>
          <ol>
            <li>Your Primary Account email address is used to create, identify and manage your user account within our app's systems.</li>
            <li>Your Primary Account name and profile picture are displayed on your user profile page and used throughout the app to represent your identity and personalize your in-app experience.</li>
          </ol>

          <hr className={styles.divider} />

          {/* Section 3 */}
          <h2 id="section-3" className={styles.sectionTitle}>3. Data Collection and Safety</h2>

          <h3 className={styles.sectionSubtitle}>Email and Name Collection</h3>
          <p>
            Our app provides options for users to sign up using their Google or Apple account. If users choose these sign-up options, we collect their email address and name associated with that email from their respective account, but only if they consent to share this information during sign-up.
          </p>
          <p>
            The email address and name collected are used solely to identify the user and create a unique account within our app and the Supabase database that stores this account information.
          </p>
          <p>
            Apart from Supabase, we do not share or transmit users' email addresses or names to any other third-party services, libraries or SDKs.
          </p>
          <p>
            Email collection is completely optional. Users can choose to use our app in 'Guest Mode' without providing any email, name or other personal information. All app features remain fully accessible in Guest Mode.
          </p>

          <h3 className={styles.sectionSubtitle}>User Data Deletion</h3>
          <p>
            Users have the option to permanently delete their account and associated email, name and other personal data from our systems and the Supabase database at any time. This can be done within the app by going to Settings/Profile and clicking the "Delete Account" button. Alternatively, users can email contact@2read.app to request deletion of their account data.
          </p>

          <h3 className={styles.sectionSubtitle}>When and with whom do we share your personal information?</h3>
          <p>
            We may share information in specific situations described in this section and/or with the following third parties. We may need to share your personal information in the following situations:
          </p>
          <ul>
            <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
            <li><strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
          </ul>

          <hr className={styles.divider} />

          {/* Section 4 */}
          <h2 id="section-4" className={styles.sectionTitle}>4. Do We Use Cookies and Other Tracking Technologies?</h2>
          <p className={styles.inShort}>
            In Short: We may use cookies and other tracking technologies to collect and store your information.
          </p>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
          </p>

          <hr className={styles.divider} />

          {/* Section 5 */}
          <h2 id="section-5" className={styles.sectionTitle}>5. How Do We Handle Your Social Logins?</h2>
          <p className={styles.inShort}>
            In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
          </p>
          <p>
            Our Services offer you the ability to register and log in using your third-party social media account details (like your Google, Apple, Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
          </p>
          <p>
            We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
          </p>

          <hr className={styles.divider} />

          {/* Section 6 */}
          <h2 id="section-6" className={styles.sectionTitle}>6. Is Your Information Transferred Internationally?</h2>
          <p className={styles.inShort}>
            In Short: We may transfer, store, and process your information in countries other than your own.
          </p>
          <p>
            If you are accessing our Services from outside, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information, in and other countries.
          </p>
          <p>
            If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this privacy notice and applicable law.
          </p>

          <hr className={styles.divider} />

          {/* Section 7 */}
          <h2 id="section-7" className={styles.sectionTitle}>7. How Long Do We Keep Your Information?</h2>
          <p className={styles.inShort}>
            In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
          </p>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
          </p>
          <p>
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
          </p>

          <hr className={styles.divider} />

          {/* Section 8 */}
          <h2 id="section-8" className={styles.sectionTitle}>8. Do We Collect Information from Minors?</h2>
          <p className={styles.inShort}>
            In Short: We do not knowingly collect data from or market to children under 18 years of age.
          </p>
          <p>
            We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at contact@2read.app.
          </p>

          <hr className={styles.divider} />

          {/* Section 9 */}
          <h2 id="section-9" className={styles.sectionTitle}>9. What Are Your Privacy Rights?</h2>
          <p className={styles.inShort}>
            In Short: You may review, change, or terminate your account at any time.
          </p>

          <h3 className={styles.sectionSubtitle}>Withdrawing your consent</h3>
          <p>
            If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "How Can You Contact Us About This Notice?" below.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
          </p>

          <h3 className={styles.sectionSubtitle}>Account Information</h3>
          <p>
            If you would at any time like to review or change the information in your account or terminate your account, you can contact us. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
          </p>

          <hr className={styles.divider} />

          {/* Section 10 */}
          <h2 id="section-10" className={styles.sectionTitle}>10. Controls for Do-Not-Track Features</h2>
          <p>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
          </p>

          <hr className={styles.divider} />

          {/* Section 11 */}
          <h2 id="section-11" className={styles.sectionTitle}>11. Affiliate Links and Commissions</h2>
          <p>
            The 2Read app includes a feature called BookShots, designed to offer users summaries and insights into popular books across various topics. In some instances, we may provide direct links within the app to purchase these books from Amazon.
          </p>
          <p>
            <strong>Affiliate Program Participation:</strong> 2Read is a participant in the Amazon Affiliate Program, meaning that we may earn a commission when you make purchases through these links. This commission comes at no additional cost to you, and the funds help support our app's development, maintenance, and enhancement of services.
          </p>
          <p>
            <strong>Data Collection and Sharing:</strong> When you click on an Amazon affiliate link, certain information (such as referral data and, if applicable, information about your purchase) may be shared with Amazon. However, we do not collect or store any personally identifiable information about your purchase through these affiliate links. All transaction details, including your identity and payment information, are handled exclusively by Amazon, in accordance with Amazon's own Privacy Policy and terms of service.
          </p>
          <p>
            <strong>User Choice:</strong> The use of affiliate links is completely optional. You are not required to make purchases through our links to use the 2Read app and its features. If you choose to use these links, your experience remains the same with no impact on your privacy within the 2Read app.
          </p>

          <hr className={styles.divider} />

          {/* Section 12 */}
          <h2 id="section-12" className={styles.sectionTitle}>12. AI-Powered Features and Data Usage</h2>
          <p>
            2Read incorporates several AI-enhanced tools, including WordWise, AI Highlight Insight, and AI Summary (for both general and custom instruction summaries). These features are powered by OpenAI's API services to provide you with deeper insights, context, and summaries of your reading highlights. When using these AI features, please be aware of the following:
          </p>
          <p>
            <strong>Data Transmission to OpenAI:</strong> When you interact with our AI features, specific data, such as text from your Kindle highlights or custom instructions for summaries, is sent to OpenAI via their API. This data is used solely for generating the responses requested within the 2Read app and is processed in real time.
          </p>
          <p>
            <strong>Privacy and Data Security:</strong> OpenAI's API Data Usage Policy ensures that no data you submit through these services is used for training or improving OpenAI models. This means that any data you provide for AI responses remains private, and OpenAI does not retain this data for any purpose beyond generating the requested output.
          </p>
          <p>
            <strong>Limited Data Storage by 2Read:</strong> We may temporarily store your interaction data within the app for your convenience, such as to display recent highlights or summaries you have accessed. However, this data is not used for any purpose outside of enhancing your app experience. Additionally, any data processed by OpenAI is handled in accordance with OpenAI's privacy and security practices.
          </p>
          <p>
            <strong>User Control and Transparency:</strong> Using the AI features within the 2Read app is entirely optional, and you have full control over what information is submitted to the AI. If you choose to use these features, only the data you provide for specific tasks (e.g., summarizing a highlight or defining a word) is processed. You may review and manage your AI interactions and saved summaries in-app at any time.
          </p>
          <p>
            <strong>Compliance and Updates:</strong> Our integration with OpenAI is aligned with industry standards and regulatory guidelines on data privacy and security. We continuously monitor and, if needed, update our privacy practices to remain compliant with OpenAI's data usage policies and other relevant regulations.
          </p>

          <hr className={styles.divider} />

          {/* Section 13 */}
          <h2 id="section-13" className={styles.sectionTitle}>13. Do We Make Updates to This Notice?</h2>
          <p>
            If you have questions or comments about this notice, you may contact us by post at:
          </p>
          <div className={styles.contactBlock}>
            <p>
              2Read<br />
              Miyapur<br />
              Hyderabad, Telangana 500049<br />
              India<br />
              contact@2read.app
            </p>
          </div>

          <hr className={styles.divider} />

          {/* Section 14 */}
          <h2 id="section-14" className={styles.sectionTitle}>14. How Can You Review, Update, or Delete the Data We Collect from You?</h2>
          <p>
            Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.
          </p>
        </div>
      </div>
    </div>
  );
}

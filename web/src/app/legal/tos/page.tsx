import Banner from "../banner";
import Navbar from "../navbar";
import ReferenceLink from "../reference-link";
import ContentLink from "./content-link";

// Don't worry, this almost 700 line long file's JSX has no complicated JavaScript.
// Its literally text content.
export default function TermsOfService() {
  return (
    <>
      <Navbar
        title="Terms of Service"
        links={
          <a
            className="p-3 border-2 border-gray-300 font rounded-full px-4"
            href="https://cdn.cms-twdigitalassets.com/content/dam/legal-twitter/site-assets/2023-10-10/en/x-terms-of-service-23-09-29.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        }
      />
      <Banner>
        Terms of <br />
        Service
      </Banner>
      <article className="px-40 py-20">
        <h2 className="font-bold text-4xl">Summary of our Terms</h2>
        <p className="my-6">
          These Terms of Service (“Terms”) are part of the User Agreement– a
          legally binding contract governing your use of Twitter.{" "}
          <strong>
            {" "}
            You should read these Terms of Service (“Terms”) in full, but here
            are a few key things you should take away:
          </strong>
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-5">
          <li>
            <strong>You will see advertising on the platform:</strong> In
            exchange for accessing the Services, Twitter and our third-party
            providers and partners may display advertising to you.
          </li>
          <li>
            <strong>
              When posting Content and otherwise using the Services, you must
              comply with this User Agreement and Applicable Law:
            </strong>{" "}
            You are responsible for your use of the Services and your Content.
            You must comply with this User Agreement, its incorporated policies,
            and all applicable laws.
          </li>
          <li>
            <strong>
              You must abide by the Services’ acceptable use terms:
            </strong>{" "}
            You may not access the Services in any way other than through the
            currently available, published interfaces that we provide. For
            example, this means that you cannot scrape the Services, try to work
            around any technical limitations we impose, or otherwise attempt to
            disrupt the operation of the Services.
          </li>
          <li>
            <strong>We have broad enforcement rights:</strong> Twitter reserves
            the right to take enforcement actions against you if you do violate
            these terms, such as, for example, removing your Content, limiting
            visibility, discontinuing your access to Twitter, or taking legal
            action. We may also suspend or terminate your account for other
            reasons, such as prolonged inactivity, risk of legal exposure, or
            commercial inviability.
          </li>
          <li>
            <strong>
              There are Intellectual Property Licenses in these Terms:
            </strong>{" "}
            You retain ownership and rights to any of your Content you post or
            share, and you provide us with a broad, royalty-free license to make
            your Content available to the rest of the world and to let others do
            the same. Conversely, we provide you a license to use the software
            we provide as part of the Services, such as the Twitter mobile
            application, solely for the purpose of enabling you to use and enjoy
            the benefit of the Services.
          </li>
          <li>
            <strong>Your use of the Services is at your own risk:</strong> We
            provide the Services on an “AS IS” and “AS AVAILABLE” basis, and we
            disclaim all warranties, responsibility, and liability to you or
            others to the extent permitted by law. You may be exposed to
            offensive or harmful content posted by other users. The Services may
            change from time to time, and we may limit or terminate availability
            of the Services or particular features to you or other users at any
            time.
          </li>
          <li>
            <strong>
              You have remedies and redress mechanisms, but our liability is
              limited:
            </strong>{" "}
            You have a right to terminate this agreement at any time by
            deactivating your account and discontinuing use of the Services.
            Note that we will not be liable for certain types of damages as
            described in the agreement, and in any event, our aggregate
            liability shall not exceed the greater of $100 USD or the amount you
            paid us, if any, in the past six months for the Services giving rise
            to the claim. Further, if you believe that your Content has been
            copied in a way that constitutes copyright infringement, the
            reporting process is detailed in these Terms.
          </li>
        </ul>
        <p className="mt-5">
          Please also note that these Terms incorporate our Privacy Policy (
          <ReferenceLink href="/legal/privacy">
            twitter.com/legal/privacy
          </ReferenceLink>
          ) as well as other terms applicable to your use of the Services and
          your Content. Finally, these terms may vary depending on where you
          live, but in any case, you must be at least 13 years old to use
          Twitter.
        </p>
        <hr className="border-gray-600 mt-10 mb-16" />
        <p>
          <strong>
            If you live outside the European Union, EFTA States, or the United
            Kingdom, including if you live in the United States,
          </strong>{" "}
          the Twitter User Agreement comprises these{" "}
          <ReferenceLink href="/legal/tos">Terms of Service</ReferenceLink>, our{" "}
          <ReferenceLink href="/legal/privacy">Privacy Policy</ReferenceLink>,
          our Rules and Policies, and all incorporated policies.
        </p>
        <p className="mt-6">
          If you live in the European Union, EFTA States, or the United Kingdom,
          the Twitter User Agreement comprises these{" "}
          <ReferenceLink href="/legal/tos">Terms of Service</ReferenceLink>, our{" "}
          <ReferenceLink href="/legal/privacy">Privacy Policy</ReferenceLink>,
          our Rules and Policies, and all incorporated policies.
        </p>
        <hr className="border-gray-600 mt-10 mb-16" />
        <h2 className="text-6xl font-bold">Twitter Terms of Service</h2>
        <h3 className="text-2xl font-bold leading-tight my-4">
          If you live outside or in the European Union, EFTA States, or the
          United Kingdom, including if you live in the United States
        </h3>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of our
          services, including our various websites, SMS, APIs, email
          notifications, applications, buttons, widgets, ads, commerce services,
          and our{" "}
          <ReferenceLink href="https://help.twitter.com/rules-and-policies/twitter-services-and-corporate-affiliates">
            other covered services
          </ReferenceLink>{" "}
          (
          <ReferenceLink href="https://help.twitter.com/rules-and-policies/twitter-services-and-corporate-affiliates">
            help.twitter.com/rules-and-policies/twitter-services-and-corporate-affiliates
          </ReferenceLink>
          ) that link to these Terms (collectively, the “Services”), and any
          information, text, links, graphics, photos, audio, videos, or other
          materials or arrangements of materials uploaded, downloaded or
          appearing on the Services (collectively referred to as “Content”). By
          using the Services you agree to be bound by these Terms. <br /> <br />
          These Terms are an agreement between you and Twitter Inc., which
          provides Twitter and the Services, 1355 Market Street, Suite 900, San
          Francisco, CA 94103 U.S.A. The words “we,” “us,” and “our” mean
          Twitter Inc.
        </p>
        <hr className="border-gray-600 mt-5 mb-20" />
        <section className="flex w-full">
          <div className="flex flex-col gap-3 w-2/5">
            <ContentLink target="who-may-use-the-services">
              1. Who May Use the <br /> Services
            </ContentLink>
            <ContentLink target="privacy">2. Privacy</ContentLink>
            <ContentLink target="content-on-the-services">
              3. Content on the Services
            </ContentLink>
            <ContentLink target="using-the-services">
              4. Using the Services
            </ContentLink>
            <ContentLink target="disclaimers-and-limitations-of-liability">
              5. Disclaimers and Limitations of Liability
            </ContentLink>
            <ContentLink target="general">6. General</ContentLink>
          </div>
          <div className="w-fit">
            <h2 id="who-may-use-the-services" className="text-5xl font-bold">
              1. Who May Use the Services
            </h2>
            <p className="my-10">
              You may use the Services only if you agree to form a binding
              contract with us and are not a person barred from receiving
              services under the laws of the applicable jurisdiction. In any
              case, you must be at least 13 years old to use the Services. If
              you are accepting these Terms and using the Services on behalf of
              a company, organization, government, or other legal entity, you
              represent and warrant that you are authorized to do so and have
              the authority to bind such entity to these Terms, in which case
              the words “you” and “your” as used in these Terms shall refer to
              such entity.
            </p>
            <h2 id="privacy" className="text-5xl font-bold">
              2. Privacy
            </h2>
            <p className="my-10">
              Our Privacy Policy (
              <ReferenceLink href="/legal/privacy">
                twitter.com/privacy
              </ReferenceLink>
              ) describes how we handle the information you provide to us when
              you use the Services. You understand that through your use of the
              Services you consent to the collection and use (as set forth in
              the Privacy Policy) of this information, including the transfer of
              this information to the United States, Ireland, and/or other
              countries for storage, processing and use by us and our
              affiliates.
            </p>
            <h2 id="content-on-the-services" className="text-5xl font-bold">
              3. Content on the Services
            </h2>
            <p className="my-10">
              You are responsible for your use of the Services and for any
              Content you provide, including compliance with applicable laws,
              rules, and regulations. You should only provide Content that you
              are comfortable sharing with others. <br /> <br />
              Any use or reliance on any Content or materials posted via the
              Services or obtained by you through the Services is at your own
              risk. We do not endorse, support, represent or guarantee the
              completeness, truthfulness, accuracy, or reliability of any
              Content or communications posted via the Services or endorse any
              opinions expressed via the Services. You understand that by using
              the Services, you may be exposed to Content that might be
              offensive, harmful, inaccurate or otherwise inappropriate, or in
              some cases, postings that have been mislabeled or are otherwise
              deceptive. All Content is the sole responsibility of the person
              who originated such Content. We may not monitor or control the
              Content posted via the Services and, we cannot take responsibility
              for such Content. <br /> <br />
              We reserve the right to remove Content that violates the User
              Agreement, including for example, copyright or trademark
              violations or other intellectual property misappropriation,
              impersonation, unlawful conduct, or harassment. Information
              regarding specific policies and the process for reporting or
              appealing violations can be found in our Help Center (
              <ReferenceLink href="https://help.twitter.com/rules-and-policies/twitter-report-violation#specific-violations">
                help.twitter.com/rules-and-policies/twitter-report-violation#specific-violations
              </ReferenceLink>{" "}
              and{" "}
              <ReferenceLink href="https://help.twitter.com/managing-your-account/suspended-twitter-accounts">
                help.twitter.com/managing-your-account/suspended-twitter-accounts
              </ReferenceLink>
              ).
              <br /> <br />
              If you believe that your Content has been copied in a way that
              constitutes copyright infringement, please report this by visiting
              our Copyright reporting form (
              <ReferenceLink href="https://help.twitter.com/forms/dmca">
                help.twitter.com/forms/dmca
              </ReferenceLink>
              ) or contacting our designated copyright agent at:
              <br /> <br />
              Twitter Inc. <br />
              Attn: Copyright Agent <br />
              1355 Market Street, Suite 900 <br />
              San Francisco, CA 94103 <br />
              Reports:{" "}
              <ReferenceLink href="https://help.twitter.com/forms/dmca">
                help.twitter.com/forms/dmca
              </ReferenceLink>
              <br />
              Email:{" "}
              <ReferenceLink href="mailto:copyright@twitter.com">
                copyright@twitter.com
              </ReferenceLink>
            </p>
            <h3 className="text-4xl font-bold">
              Your Rights and Grant of Rights in the Content
            </h3>
            <p className="my-10">
              You retain your rights to any Content you submit, post or display
              on or through the Services. What’s yours is yours — you own your
              Content (and your incorporated audio, photos and videos are
              considered part of the Content). <br /> <br />
              By submitting, posting or displaying Content on or through the
              Services, you grant us a worldwide, non-exclusive, royalty-free
              license (with the right to sublicense) to use, copy, reproduce,
              process, adapt, modify, publish, transmit, display and distribute
              such Content in any and all media or distribution methods now
              known or later developed (for clarity, these rights include, for
              example, curating, your Content available to the rest of the world
              and to let others transforming, and translating). This license
              authorizes us to make do the same. You agree that this license
              includes the right for us to provide, promote, and improve the
              Services and to make Content submitted to or through the Services
              available to other companies, organizations or individuals for the
              syndication, broadcast, distribution, Retweet, promotion or
              publication of such Content on other media and services, subject
              to our terms and conditions for such Content use. Such additional
              uses by us, or other companies, organizations or individuals, is
              made with no compensation paid to you with respect to the Content
              that you submit, post, transmit or otherwise make available
              through the Services as the use of the Services by you is hereby
              agreed as being sufficient compensation for the Content and grant
              of rights herein. <br /> <br />
              We have an evolving set of rules for how ecosystem partners can
              interact with your Content on the Services. These rules exist to
              enable an open ecosystem with your rights in mind. You understand
              that we may modify or adapt your Content as it is distributed,
              syndicated, published, or broadcast by us and our partners and/or
              make changes to your Content in order to adapt the Content to
              different media. <br /> <br />
              You represent and warrant that you have, or have obtained, all
              rights, licenses, consents, permissions, power and/or authority
              necessary to grant the rights granted herein for any Content that
              you submit, post or display on or through the Services. You agree
              that such Content will not contain material subject to copyright
              or other proprietary rights, unless you have necessary permission
              or are otherwise legally entitled to post the material and to
              grant us the license described above.
            </p>
            <h2 id="using-the-services" className="text-5xl font-bold">
              4. Using the Services
            </h2>
            <p className="my-10">
              Please review{" "}
              <ReferenceLink href="https://help.twitter.com/rules-and-policies">
                our Rules and Policies
              </ReferenceLink>
              , which are part of the User Agreement and outline conduct that is
              prohibited on the Services. You may use the Services only in
              compliance with these Terms and all applicable laws, rules and
              regulations. Twitter takes enforcement actions when Content or
              user behavior is in violation of{" "}
              <ReferenceLink href="https://help.twitter.com/rules-and-policies">
                our Rules and Policies
              </ReferenceLink>{" "}
              or in relation to sensitive media. You can review Twitter’s
              enforcement options and how you can appeal our enforcement
              decision{" "}
              <ReferenceLink href="https://help.twitter.com/rules-and-policies/enforcement-options">
                here
              </ReferenceLink>
              . <br /> <br /> The Services evolve constantly. As such, the
              Services may change from time to time, at our discretion. We may
              stop (permanently or temporarily) providing the Services or any
              features within the Services to you or to users generally. We also
              retain the right to create limits on use and storage at our sole
              discretion at any time. We may also remove or refuse to distribute
              any Content on the Services, limit distribution or visibility of
              any Content on the service, suspend or terminate users, and
              reclaim usernames without liability to you.
              <br /> <br />
              In consideration for our granting you access to and use of the
              Services, you agree that we and our third-party providers and
              partners may place advertising on the Services or in connection
              with the display of Content or information from the Services
              whether submitted by you or others. We also reserve the right to
              access, read, preserve, and disclose any information as we
              reasonably believe is necessary to (i) satisfy any applicable law,
              regulation, legal process or governmental request, (ii) enforce
              the Terms, including investigation of potential violations hereof,
              (iii) detect, prevent, or otherwise address fraud, security or
              technical issues, (iv) respond to user support requests, or (v)
              protect the rights, property or safety of Twitter, its users and
              the public. We do not disclose personally-identifying information
              to third parties except in accordance with our{" "}
              <ReferenceLink href="/legal/privacy">
                Privacy Policy
              </ReferenceLink>
              .
              <br /> <br />
              Certain services or features may be offered on Twitter for which
              additional terms and conditions may apply in connection with your
              use of those services. By using or paying for any of these
              additional services, you agree to any additional terms applicable
              to those services, and those additional terms become part of our
              agreement with you. If any of the applicable additional terms
              conflict with these Terms, the additional terms will prevail while
              you are using those services to which they apply. <br /> <br />
              If you use paid features of the Services, you agree to the
              applicable Terms for Paid Services (
              <ReferenceLink href="https://legal.twitter.com/purchaser-terms.html">
                legal.twitter.com/purchaser-terms.html
              </ReferenceLink>
              ). <br /> <br />
              If you use developer features of the Services, including but not
              limited to Twitter for Websites (
              <ReferenceLink href="https://developer.twitter.com/docs/twitter-for-websites">
                developer.twitter.com/docs/twitter-for-websites
              </ReferenceLink>
              ), Twitter Cards (
              <ReferenceLink href="https://developer.twitter.com/docs/twitter-for-websites/cards/overview/abouts-cards">
                developer.twitter.com/docs/twitter-for-websites/cards/overview/abouts-cards
              </ReferenceLink>
              ), Public API (
              <ReferenceLink href="https://developer.twitter.com/docs">
                developer.twitter.com/docs
              </ReferenceLink>
              ), or Sign in with Twitter (
              <ReferenceLink href="https://developer.twitter.com/docs/authentication/guides/log-in-with-twitter">
                developer.twitter.com/docs/authentication/guides/log-in-with-twitter
              </ReferenceLink>
              ), you agree to our Developer Agreement (
              <ReferenceLink href="https://developer.twitter.com/developer-terms/agreement">
                developer.twitter.com/developer-terms/agreement
              </ReferenceLink>
              ) and Developer Policy (
              <ReferenceLink href="https://developer.twitter.com/developer-terms/policy">
                developer.twitter.com/developer-terms/policy
              </ReferenceLink>
              ). If you want to reproduce, modify, create derivative works,
              distribute, sell, transfer, publicly display, publicly perform,
              transmit, or otherwise use the Services or Content on the
              Services, you must use the interfaces and instructions we provide,
              except as permitted through the Services, these Terms, or the
              terms provided on{" "}
              <ReferenceLink href="https://developer.twitter.com/developer-terms">
                developer.twitter.com/developer-terms
              </ReferenceLink>
              . Otherwise, all such actions are strictly prohibited. If you are
              a security researcher, you are required to comply with the rules
              of our Vulnerability Reporting Program (
              <ReferenceLink href="https://hackerone.com/twitter">
                hackerone.com/twitter
              </ReferenceLink>
              ). The requirements set out in the preceding paragraph may not
              apply to those participating in our Vulnerability Reporting
              Program. <br /> <br />
              If you use advertising features of the Services, you agree to our
              Master Services Agreement (
              <ReferenceLink href="https://ads.twitter.com/terms">
                ads.twitter.com/terms
              </ReferenceLink>
              ).
            </p>
            <h3 className="text-4xl font-bold">Your Account</h3>
            <p className="my-10">
              You may need to create an account to use the Services. You are
              responsible for safeguarding your account, so use a strong
              password and limit its use to this account. We cannot and will not
              be liable for any loss or damage arising from your failure to
              comply with the above. <br /> <br />
              You can control most communications from the Services. We may need
              to provide you with certain communications, such as service
              announcements and administrative messages. These communications
              are considered part of the Services and your account, and you may
              not be able to opt-out from receiving them. If you added your
              phone number to your account and you later change or deactivate
              that phone number, you must update your account information to
              help prevent us from communicating with anyone who acquires your
              old number.
            </p>
            <h3 className="text-4xl font-bold">
              Your License to Use the Services
            </h3>
            <p className="my-10">
              We give you a personal, worldwide, royalty-free, non-assignable
              and non-exclusive license to use the software provided to you as
              part of the Services. This license has the sole purpose of
              enabling you to use and enjoy the benefit of the Services as
              provided on Twitter, in the manner permitted by these Terms.
              <br /> <br />
              The Services are protected by copyright, trademark, and other laws
              of both the United States and other countries. Nothing in the
              Terms gives you a right to use the Twitter name or any of the
              Twitter trademarks, logos, domain names, other distinctive brand
              features, and other proprietary rights. All right, title, and
              interest in and to the Services (excluding Content provided by
              users) are and will remain our and our licensor&apos;s exclusive
              property. Any feedback, comments, or suggestions you may provide
              regarding Twitter, or the Services is entirely voluntary and we
              will be free to use such feedback, comments or suggestions as we
              see fit and without any obligation to you.
            </p>
            <h3 className="text-4xl font-bold">Misuse of the Services</h3>
            <p className="my-10">
              You also agree not to misuse the Services, for example, by
              interfering with them or accessing them using a method other than
              the interface and the instructions that we provide. You agree that
              you will not work around any technical limitations in the software
              provided to you as part of the Services, or reverse engineer,
              decompile or disassemble the software, except and only to the
              extent that applicable law expressly permits. You may not do any
              of the following while accessing or using the Services: (i)
              access, tamper with, or use non-public areas of the Services, our
              computer systems, or the technical delivery systems of our
              providers; (ii) probe, scan, or test the vulnerability of any
              system or network or breach or circumvent any security or
              authentication measures; (iii) access or search or attempt to
              access or search the Services by any means (automated or
              otherwise) other than through our currently available, published
              interfaces that are provided by us (and only pursuant to the
              applicable terms and conditions), unless you have been
              specifically allowed to do so in a separate agreement with us
              (NOTE: crawling or scraping the Services in any form, for any
              purpose without our prior written consent is expressly
              prohibited); (iv) forge any TCP/IP packet header or any part of
              the header information in any email or posting, or in any way use
              the Services to send altered, deceptive or false
              source-identifying information; (v) engage in any conduct that
              violates our{" "}
              <ReferenceLink href="https://help.twitter.com/rules-and-policies/platform-manipulation">
                Platform Manipulation and Spam Policy
              </ReferenceLink>{" "}
              or any other{" "}
              <ReferenceLink href="https://help.twitter.com/rules-and-policies">
                Rules and Policies
              </ReferenceLink>
              ; or (vi) interfere with, or disrupt, (or attempt to do so), the
              access of any user, host or network, including, without
              limitation, sending a virus, overloading, flooding, spamming,
              mail-bombing the Services, or by scripting the creation of Content
              in such a manner as to interfere with or create an undue burden on
              the Services. It is also a violation of these Terms to facilitate
              or assist others in violating these Terms, including by
              distributing products or services that enable or encourage
              violation of these Terms.
            </p>
            <h3 className="text-4xl font-bold">Ending These Terms</h3>
            <p className="my-10">
              You may end your legal agreement with us at any time by
              deactivating your accounts and discontinuing your use of the
              Services. See{" "}
              <ReferenceLink href="https://help.twitter.com/managing-your-account/how-to-deactivate-twitter-account">
                help.twitter.com/managing-your-account/how-to-deactivate-twitter-account
              </ReferenceLink>{" "}
              for instructions on how to deactivate your account and the Privacy
              Policy for more information on what happens to your information.
              <br /> <br />
              We may suspend or terminate your account or cease providing you
              with all or part of the Services at any time if we reasonably
              believe: (i) you have violated these Terms or{" "}
              <ReferenceLink href="https://help.twitter.com/rules-and-policies">
                our Rules and Policies
              </ReferenceLink>
              , (ii) you create risk or possible legal exposure for us; (iii)
              your account should be removed due to unlawful conduct; (iv) your
              account should be removed due to prolonged inactivity; or (v) our
              provision of the Services to you is no longer commercially viable.
              We will make reasonable efforts to notify you by the email address
              associated with your account or the next time you attempt to
              access your account, depending on the circumstances. To the extent
              permitted by law, we may also terminate your account or cease
              providing you with all or part of the Services for any other
              reason or no reason at our convenience. In all such cases, the
              Terms shall terminate, including, without limitation, your license
              to use the Services, except that the following sections shall
              continue to apply: 2, 3, 5, 6, and the misuse provisions of
              Section 4 (“Misuse of the Services”). If you believe your account
              was terminated in error you can file an appeal following the steps
              found in our{" "}
              <ReferenceLink href="https://help.twitter.com/forms/account-access/appeals">
                Help Center
              </ReferenceLink>{" "}
              (
              <ReferenceLink href="https://help.twitter.com/forms/account-access/appeals">
                help.twitter.com/forms/account-access/appeals
              </ReferenceLink>
              ). For the avoidance of doubt, these Terms survive the
              deactivation or termination of your account.
            </p>
            <h2
              id="disclaimers-and-limitations-of-liability"
              className="text-5xl font-bold"
            >
              5. Disclaimers and Limitations of Liability
            </h2>
            <h3 className="text-4xl font-bold mt-10">
              The Services are Available &quot;AS-IS&quot;
            </h3>
            <p className="my-10">
              Your access to and use of the Services or any Content are at your
              own risk. You understand and agree that the Services are provided
              to you on an “AS IS” and “AS AVAILABLE” basis. The “Twitter
              Entities” refers to Twitter Inc., its parents, affiliates, related
              companies, officers, directors, employees, agents,
              representatives, partners, and licensors. Without limiting the
              foregoing, to the maximum extent permitted under applicable law,
              THE Twitter ENTITIES DISCLAIM ALL WARRANTIES AND CONDITIONS,
              WHETHER ETwitterPRESS OR IMPLIED, OF MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. The Twitter Entities
              make no warranty or representation and disclaim all responsibility
              and liability for: (i) the completeness, accuracy, availability,
              timeliness, security or reliability of the Services or any
              Content; (ii) any harm to your computer system, loss of data, or
              other harm that results from your access to or use of the Services
              or any Content; (iii) the deletion of, or the failure to store or
              to transmit, any Content and other communications maintained by
              the Services; and (iv) whether the Services will meet your
              requirements or be available on an uninterrupted, secure, or
              error-free basis. No advice or information, whether oral or
              written, obtained from the Twitter Entities or through the
              Services, will create any warranty or representation not expressly
              made herein.
            </p>
            <h3 className="text-4xl font-bold">Limitation of Liability</h3>
            <p className="my-10">
              TO THE MATwitterIMUM ETwitterTENT PERMITTED BY APPLICABLE LAW, THE
              TWITTER ENTITIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
              OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS
              OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM
              (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE
              SERVICES; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE
              SERVICES, INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE
              OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; (iii) ANY
              CONTENT OBTAINED FROM THE SERVICES; OR (iv) UNAUTHORIZED ACCESS,
              USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. IN NO EVENT
              SHALL THE AGGREGATE LIABILITY OF THE TWITTER ENTITIES ETwitterCEED
              THE GREATER OF ONE HUNDRED U.S. DOLLARS (U.S. $100.00) OR THE
              AMOUNT YOU PAID TWITTER, IF ANY, IN THE PAST SITwitter MONTHS FOR
              THE SERVICES GIVING RISE TO THE CLAIM. THE LIMITATIONS OF THIS
              SUBSECTION SHALL APPLY TO ANY THEORY OF LIABILITY, WHETHER BASED
              ON WARRANTY, CONTRACT, STATUTE, TORT (INCLUDING NEGLIGENCE) OR
              OTHERWISE, AND WHETHER OR NOT THE TWITTER ENTITIES HAVE BEEN
              INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE, AND EVEN IF A
              REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL
              PURPOSE.
            </p>
            <h2 id="general" className="text-5xl font-bold">
              6. General
            </h2>
            <p className="my-10">
              We may revise these Terms from time to time. The changes will not
              be retroactive, and the most current version of the Terms, which
              will always be at{" "}
              <ReferenceLink href="https://twitter.com/legal/tos">
                twitter.com/tos
              </ReferenceLink>
              , will govern our relationship with you. We will try to notify you
              of material revisions, for example via a service notification or
              an email to the email associated with your account. By continuing
              to access or use the Services after those revisions become
              effective, you agree to be bound by the revised Terms. To the
              extent permitted by law, you also waive the right to participate
              as a plaintiff or class member in any purported class action,
              collective action or representative action proceeding.
              <br /> <br />
              The laws of the State of California, excluding its choice of law
              provisions, will govern these Terms and any dispute that arises
              between you and us. All disputes related to these Terms or the
              Services will be brought solely in the federal or state courts
              located in San Francisco County, California, United States, and
              you consent to personal jurisdiction and waive any objection as to
              inconvenient forum. To the extent permitted by law, you also waive
              the right to participate as a plaintiff or class member in any
              purported class action, collective action or representative action
              proceeding. <br /> <br />
              If you are a federal, state, or local government entity in the
              United States using the Services in your official capacity and
              legally unable to accept the controlling law, jurisdiction or
              venue clauses above, then those clauses do not apply to you. For
              such U.S. federal government entities, these Terms and any action
              related thereto will be governed by the laws of the United States
              of America (without reference to conflict of laws) and, in the
              absence of federal law and to the extent permitted under federal
              law, the laws of the State of California (excluding choice of
              law). <br /> <br />
              The Twitter User Agreement is written in English but is made
              available in multiple languages through translations. Twitter
              strives to make the translations as accurate as possible to the
              original English version. However, in case of any discrepancies or
              inconsistencies, the English language version of the Twitter User
              Agreement shall take precedence. You acknowledge that English
              shall be the language of reference for interpreting and
              constructing the terms of the Twitter User Agreement.
              <br /> <br />
              In the event that any provision of these Terms is held to be
              invalid or unenforceable, then that provision will be limited or
              eliminated to the minimum extent necessary, and the remaining
              provisions of these Terms will remain in full force and effect.
              Our failure to enforce any right or provision of these Terms will
              not be deemed a waiver of such right or provision. <br /> <br />
              If you have any questions about these Terms, please contact{" "}
              <ReferenceLink href="https://help.twitter.com/forms">
                us
              </ReferenceLink>
              . <br /> <br />
              <strong>Effective:</strong> Infinity
            </p>
            <hr className="border-gray-600 mt-10 mb-16" />
          </div>
        </section>
      </article>
    </>
  );
}

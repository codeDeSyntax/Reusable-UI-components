import Layout from "./Layout";

const ContactForm = () => {
  return (
    <Layout>
      <div className=" text-white pt-36 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full bg-primary rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side */}
            <div className="w-full md:w-1/2 p-8 space-y-6">
              <h2 className="text-3xl font-bold">
                Lets discuss
                <br />
                on something <span className="text-pink-500">cool</span>
                <br />
                together
              </h2>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="material-icons mr-2">email</span>
                  SaulDesign@gmail.com
                </p>
                <p className="flex items-center">
                  <span className="material-icons mr-2">phone</span>
                  +123 456 789
                </p>
                <p className="flex items-center">
                  <span className="material-icons mr-2">location_on</span>
                  123 Street 456 House
                </p>
              </div>
              <div className="flex space-x-4 mt-8">
                <a href="#" className="bg-accent p-2 rounded-full">
                  <span className="material-icons">facebook</span>
                </a>
                <a href="#" className="bg-accent p-2 rounded-full">
                  <span className="material-icons">instagram</span>
                </a>
                <a href="#" className="bg-accent p-2 rounded-full">
                  <span className="material-icons">twitter</span>
                </a>
              </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg">
              <form className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">Reach out to me here...</p>
                  {/* <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm">
                      UI/UX design
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
                      Web design
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
                      Graphic design
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
                      Design system
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm">
                      Other
                    </button>
                  </div> */}
                </div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
                />
                <textarea
                  placeholder="Your message"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
                  rows="3"
                ></textarea>
                <button className="w-full bg-pink-600 text-white py-3 rounded-lg flex items-center justify-center">
                  Send Message
                  <span className="material-icons ml-2">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactForm;

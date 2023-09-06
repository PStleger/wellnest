// import nest from "./images/nest.png"
import placeholder from "../assets/images/placeholder.png";
import placeholder1 from "../assets/images/placeholder1.png";
import placeholder2 from "../assets/images/placeholder2.png";
import placeholder3 from "../assets/images/placeholder3.png";
// import placeholder4 from "./images/placeholder4.png"
import { Link } from "react-router-dom";
const HowItWorks = () => {
  return (
    <div>
      <div className=" bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]">
        <section>
          <div className=" flex flex-col items-center pt-16 ">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
              How our app works
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
              Discover the Power of Emotion with WellNest Revolutionizing
              Emotional Well-Being
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 "></div>
          </div>
        </section>
        <section>
          <div className=" gap-2 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img
              className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
              src={placeholder}
            />
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                Revolutionizing Emotional Well-Being
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg ">
                In todays fast-paced world, its easy to push our emotions aside
                or dismiss them in favor of intellectualizing our experiences.
                Did you know that the human body requires just 90 seconds to
                process an emotion when fully felt? However, our modern culture
                often encourages us to suppress or rationalize these feelings,
                hindering their natural release. This is where WellNest steps in
                as an invaluable tool for your mental health journey.
              </p>

              <Link
                to="/register"
                className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign Up
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white  border border-black-300 shadow-2xl p-4">
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                Knowledge Hub: Expert Articles and Community Insights
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg ">
                Comprehensive Knowledge Base featuring expertly crafted articles
                alongside community-generated insights and Unlock the power of
                self-reflection with Wellnest's Journaling tool. Document your
                thoughts, emotions, and experiences as you embark on a journey
                of self-discovery. Empower yourself with evidence-based
                information and diverse perspectives.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <img
                className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
                src={placeholder1}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img
              className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
              src={placeholder2}
            />

            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                Body Scan for Mindful Wellness
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg ">
                Experience a profound connection between your body and mind with
                Wellnest's Body Scan feature. Achieve a state of deep relaxation
                and self-awareness as you explore the intricacies of your body,
                paving the way for holistic wellness.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white  border border-black-300 shadow-2xl p-4">
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                Box Breathing for Stress Relief
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg ">
                Manage stress and anxiety with Wellnest's Box Breathing
                exercises. Harness the therapeutic benefits of controlled
                breathwork to calm your nervous system, reduce tension, and find
                inner balance
              </p>
              <Link
                to="/progress/new"
                className="inline-flex items-center text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Get started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <img
                className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
                src={placeholder3}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;

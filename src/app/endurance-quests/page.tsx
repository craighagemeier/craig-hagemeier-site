import CubeCarousel from "../components/molecules/CubeCarousel/CubeCarousel";
import IronmanProgressTracker from "../components/molecules/IronmanProgressTracker";
import Link from "../components/atoms/Link/Link";

const racePhotos = [
  {
    src: "/images/endurance/IRONMAN-Florida-swim-start.jpg",
    alt: "IRONMAN swim start - athletes on the beach",
    caption: "Swim start - IRONMAN Florida, 2021",
  },
  {
    src: "/images/endurance/IRONMAN-Iowa-bike-course.jpg",
    alt: "Cycling through the heartland",
    caption: "Conquering the bike course - IRONMAN Des Moines, 2022",
  },
  {
    src: "/images/endurance/IRONMAN-Maryland-finish-line.jpg",
    alt: "Crossing the finish line",
    caption: "Crossing the finish line - IRONMAN Maryland, 2023",
  },
  {
    src: "/images/endurance/IRONMAN-St-George-World-Championship.jpg",
    alt: "IRONMAN St. George World Championship",
    caption: "IRONMAN World Championship - St. George, Utah, 2022",
  },
  {
    src: "/images/endurance/IRONMAN-Tennessee-finish-line.jpg",
    alt: "Finish line celebration at IRONMAN Tennessee",
    caption: "Finish line celebration - IRONMAN Chattanooga, 2019",
  },
  {
    src: "/images/endurance/IRONMAN-Texas-swim-start.jpg",
    alt: "IRONMAN Texas swim start",
    caption: "Swim start - IRONMAN Texas, 2019",
  },
  {
    src: "/images/endurance/IRONMAN-Wisconsin-finish-line.jpg",
    alt: "IRONMAN Wisconsin finish line",
    caption: "Finish line with family after my first IRONMAN - Madison, Wisconsin, 2015",
  },
  {
    src: "/images/endurance/ALC.jpg",
    alt: "AIDS LifeCycle",
    caption: "AIDS LifeCycle 2016 - Cycling 545 miles from San Francisco to Los Angeles",
  },
  {
    src: "/images/endurance/Chicago-IronMonster-team.jpg",
    alt: "Chicago IronMonster team",
    caption: "Team Chicago IronMonster - February 2020",
  },
  {
    src: "/images/endurance/Marathon-Havana-Cuba.jpg",
    alt: "Havana Cuba Marathon",
    caption:
      "Havana Cuba Marathon, 2019 - Running through the streets of Havana",
  },
    {
    src: "/images/endurance/IRONMAN-Louisville.jpg",
    alt: "IRONMAN Louisville team photo",
    caption: "Team Chicago IronMonster - IRONMAN Louisville, 2016",
    },
  {
    src: "/images/endurance/IRONMAN-Arizona.jpg",
    alt: "IRONMAN Arizona finish line",
    caption: "Celebrating with family - IRONMAN Arizona, 2017",
    },
];

const ironmanRaces = [
  {
    name: "Wisconsin",
    location: "Madison",
    date: "2015",
    completed: true
  },
  {
    name: "Louisville",
    location: "Kentucky",
    date: "2016",
    completed: true
  },
  {
    name: "Arizona",
    location: "Tempe",
    date: "2017",
    completed: true
  },
  {
    name: "Texas",
    location: "The Woodlands",
    date: "2019",
    completed: true
  },
  {
    name: "Chattanooga",
    location: "Tennessee",
    date: "2019",
    completed: true
  },
  {
    name: "Florida",
    location: "Panama City Beach",
    date: "2021",
    completed: true
  },
  {
    name: "Des Moines",
    location: "Iowa",
    date: "2022",
    completed: true
  },
  {
    name: "Maryland",
    location: "Cambridge",
    date: "2023",
    completed: true
  },
  {
    name: "Wisconsin",
    location: "Madison",
    date: "2024",
    completed: true
  },
  {
    name: "Wisconsin",
    location: "Madison",
    date: "2025",
    completed: false
  },
  {
    name: "TBD",
    location: "TBD",
    date: "TBD",
    completed: false
  },
  {
    name: "TBD",
    location: "TBD",
    date: "TBD",
    completed: false
  },
  {
    name: "Kona Legacy",
    location: "Hawaii",
    date: "TBD",
    completed: false
  }
];

export default function EndurancePage() {
  return (
    <div>
      <section className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <h2>Pushing Limits:</h2>
            <h3>My Endurance Quests</h3>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>I've always been a runner. In school, it was track and cross country. In college, "long" runs meant heading from the Engineering Quad to the South Farms and back. Then, in my 20s, I caught the marathon bug &mdash; that's a 26.2-mile run, in case you're wondering.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>An injury pushed me toward cycling and swimming, which led to my first triathlon. Then a half-IRONMAN (a 70.3-mile race). Then the full thing: a 140.6-mile IRONMAN triathlon. That's 2.4 miles of swimming, 112 miles on the bike, and a full 26.2-mile run. All in one day.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p> You get the idea. Set a big goal. Do something that pushes your limits. Do something epic. Celebrate the win or learn from the loss, then move on to the next challenge. After reading{" "}<Link href="https://www.goodreads.com/book/show/20170321-the-happiness-of-pursuit"><em>The Happiness of Pursuit</em></Link>{", "} I started thinking about long-term, multi-year quests. Here are a few I'm working on now. </p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <CubeCarousel photos={racePhotos} />
          </div>
        </div>
      </section>
      <section className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <h3>IRONMAN: Quest for Kona</h3>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col-xs-12 ch-col-sm-6 ch-col-md-5 ch-col-lg-6 ch-col-xl-6">
            <div className="ch-row">
              <div className="ch-col">
                <p>When I was a kid, I saw the IRONMAN World Championship in Hawaii on TV. This was way before I ran my first marathon, but something about it stuck. It planted a seed &mdash; what if I could do that one day?</p>
              </div>
            </div>
            <div className="ch-row">
              <div className="ch-col">
                <p>Getting into this race isn't easy. Option 1: Win another IRONMAN race. Yeah, that's not happening. I've got endurance, grit, and a good dose of stubbornness, but raw speed? Not so much. Option 2: Fundraise for a charity. A great cause, but there's only so many times I can hit up friends and family for donations. I'm saving that for when I finally run the Boston Marathon.</p>
              </div>
            </div>
            <div className="ch-row">
              <div className="ch-col">
                <p>That leaves Option 3: The Legacy Program. The deal? Finish 12 full IRONMAN races, and your name gets entered into a lottery. Stick with it long enough, and eventually, your number gets called. So that's the plan. One race at a time.</p>
              </div>
            </div>
          </div>
          <div className="ch-col-xs-12 ch-col-sm-6 ch-col-md-7 ch-col-lg-6 ch-col-xl-6">
            <IronmanProgressTracker
              completedRaces={9}
              totalRaces={12}
              raceData={ironmanRaces}
            />
          </div>
        </div>
      </section>
      <section className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <h3>50 Marathons in 50 States</h3>
          </div>
        </div>
      </section>
      <section className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <h3>Personal Records</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

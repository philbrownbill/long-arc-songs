"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const genres = [
  { id: "pop", label: "Pop", title: "Contemporary Pop", description: "Direct, melodic songs built around distinctive ideas and unforgettable choruses." },
  { id: "country", label: "Country", title: "Country & Americana", description: "Character-led writing, lived-in detail and stories that earn their emotional payoff." },
  { id: "soul", label: "Soul", title: "Soul & R&B", description: "Vocal-first songs with emotional weight, rhythmic confidence and room for a great performance." },
  { id: "folk", label: "Folk", title: "Pop-Folk & Acoustic", description: "Warm, intimate songs where lyric, melody and the human voice stay close to the surface." },
  { id: "big-band", label: "Big band", title: "Big Band & Jazz-Pop", description: "Bold, sophisticated songs imagined with brass, swing and commanding lead vocals." },
  { id: "adult-contemporary", label: "A/C", title: "Adult Contemporary", description: "Timeless melodies, mature perspectives and emotionally resonant ballads." },
];

const featured = [
  { number: "01", genre: "Lead selection", tone: "Your strongest opening song" },
  { number: "02", genre: "Range selection", tone: "A contrasting side of the catalogue" },
  { number: "03", genre: "Signature selection", tone: "A song only Long Arc could write" },
];

function Waveform({ variant = 0 }: { variant?: number }) {
  const patterns = [
    [16, 30, 44, 24, 55, 37, 64, 46, 27, 52, 36, 20, 42, 31, 15],
    [34, 18, 29, 51, 38, 22, 60, 44, 66, 29, 48, 35, 55, 25, 39],
    [22, 39, 17, 47, 63, 34, 50, 28, 57, 41, 24, 45, 31, 52, 20],
  ];
  return (
    <div className="waveform" aria-hidden="true">
      {patterns[variant % patterns.length].map((height, index) => <span key={index} style={{ height }} />)}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Long Arc Songs home">
          <span className="brand-mark" aria-hidden="true">LA</span><span>Long Arc Songs</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#songs">Songs</a><a href="#genres">Genres</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Independent songwriting partnership · UK</p>
          <h1>Thirty years of songs.<br /><em>A new chapter.</em></h1>
          <p className="hero-intro">Melodic, emotionally direct songs for artists across pop, country, soul, folk, big band and adult contemporary music.</p>
          <a className="primary-link" href="#songs">Listen to the featured songs <span>↘</span></a>
        </div>
        <div className="arc-stage" aria-hidden="true">
          <span className="arc arc-one" /><span className="arc arc-two" /><span className="arc arc-three" />
          <div className="arc-caption"><strong>30+</strong><span>years writing<br />together</span></div>
        </div>
      </section>

      <section className="featured section-shell" id="songs">
        <div className="section-heading">
          <div><p className="eyebrow">Start here</p><h2>Featured songs</h2></div>
          <p>Our strongest, most immediately pitchable work—selected to show range without losing focus.</p>
        </div>
        <div className="song-grid">
          {featured.map((song, index) => (
            <article className="song-card" key={song.number}>
              <div className="song-topline"><span>{song.number}</span><span>{song.genre}</span></div>
              <div className="song-art"><span className="small-arc" /><Waveform variant={index} /></div>
              <div className="song-details">
                <div><h3>Song title</h3><p>{song.tone}</p></div><span className="audio-status">Audio to add</span>
              </div>
            </article>
          ))}
        </div>
        <p className="editor-note">These three spaces are deliberately reserved for the songs you choose to lead with.</p>
      </section>

      <section className="genre-section" id="genres">
        <div className="section-shell">
          <div className="section-heading light-heading">
            <div><p className="eyebrow">Explore the catalogue</p><h2>Different colours.<br />The same craft.</h2></div>
            <p>Browse the catalogue by genre. Songs can live in more than one collection when the writing travels.</p>
          </div>
          <Tabs defaultValue="pop" className="genre-tabs">
            <TabsList variant="line" className="genre-list" aria-label="Song genres">
              {genres.map((genre) => <TabsTrigger key={genre.id} value={genre.id}>{genre.label}</TabsTrigger>)}
            </TabsList>
            {genres.map((genre, index) => (
              <TabsContent key={genre.id} value={genre.id} className="genre-panel">
                <div className="genre-number">0{index + 1}</div>
                <div className="genre-copy"><h3>{genre.title}</h3><p>{genre.description}</p></div>
                <div className="genre-slots">
                  <div><span>01</span><strong>Song title</strong><small>Demo to add</small></div>
                  <div><span>02</span><strong>Song title</strong><small>Demo to add</small></div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <figure className="studio-image">
        <img src="/studio-microphone.png" alt="A vintage studio microphone in warm light beside analogue recording equipment" />
        <figcaption><span>The songs are human.</span><strong>The production brings them into the room.</strong></figcaption>
      </figure>

      <section className="about section-shell" id="about">
        <div className="about-kicker"><span>Writing for</span><strong>30+</strong><span>years</span></div>
        <div className="about-copy">
          <p className="eyebrow">About Long Arc</p><h2>Built on a long creative partnership.</h2>
          <p className="lead">Long Arc Songs is the home of Phil and Jay, a UK songwriting partnership built over more than three decades of writing together.</p>
          <div className="about-columns">
            <p>Their catalogue ranges from intimate acoustic songs and emotionally driven ballads to contemporary pop, classic soul and full-scale, brass-led arrangements—all united by strong melody, direct storytelling and memorable choruses.</p>
            <p>Previously signed to a five-year agreement with an American music publisher, their songs have been professionally produced in Nashville and put forward for artists including Michael Bublé, Westlife and Trace Adkins.</p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div><p className="eyebrow">Artists · Publishers · Producers · Music supervisors</p><h2>Looking for the right song?</h2></div>
        <div className="contact-side"><p>Long Arc Songs is open to pitches, collaborations and writing to commercial briefs.</p><span>Contact details to be added</span></div>
      </section>
      <footer><span>© 2026 Long Arc Songs</span><span>Songs written to last.</span></footer>
    </main>
  );
}

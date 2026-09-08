import {
  Audiences,
  ClosingCta,
  Ecosystem,
  HomeHero,
  IndustriesRow,
  Method,
  Reach,
  TrustStrip,
  WhyGarnet,
} from "@/components/sections";

/**
 * The homepage is composition only. Each band owns its own layout and copy,
 * which keeps this file readable as the story the page tells:
 * what we do → what proves it → how the three parts fit → who we serve →
 * how the work runs → why us → sectors → reach → act.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <Ecosystem />
      <Audiences />
      <Method />
      <WhyGarnet />
      <IndustriesRow />
      <Reach />
      <ClosingCta />
    </>
  );
}

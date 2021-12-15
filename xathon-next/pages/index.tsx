import type { GetServerSideProps, NextPage } from "next";
import SearchBar from "../components/SearchBar/SearchBar";
import { GrFormNextLink } from "react-icons/gr";
import Link from "next/link";
import { XathonFactoryReader } from "../services/contracts/XathonFactory";

interface HomeProps {
  names: string[];
}
const Home: NextPage<HomeProps> = ({ names }) => {
  return (
    <div className="flex flex-col items-center mt-10 gap-10">
      <SearchBar queryItems={names} />
      <div className="w-1/2">
        <h3 className="text-xl text-center">
          <span className="font-header text-2xl">Xathon</span>
          &nbsp;is built with <span className="font-bold">ethereum</span>
        </h3>
        <ul className="list-disc">
          <li>
            <b>Decentralized</b> Walkathon events are called Xathons Deploy
            them, and allow anyone with a wallet to donate.
          </li>
          <li>
            <b>100%</b> transparent. Recipient address is clearly visible, and
            donated amounts is free for everyone to see
          </li>
          <li>
            <b>All</b> funds go directly to recipient's address. We take none,
            and neither does anyone else
          </li>
        </ul>
      </div>
      <Link href="/create">
        <a className="group w-32 h-10 text-xl font-semibold flex items-center justify-center rounded-lg transition-shadow shadow-md hover:shadow-lg shadow-pink-900 hover:shadow-pink-900 bg-orange-400">
          Create{" "}
          <GrFormNextLink className="transition-transform transform group-hover:translate-x-3 ml-2 inline-block" />
        </a>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const xathonFactoryReader = new XathonFactoryReader();
  const names = await xathonFactoryReader.getContractNames();
  return {
    props: {
      names,
    },
  };
};

export default Home;

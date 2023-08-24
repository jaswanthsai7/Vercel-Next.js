import Head from "next/head";
import { MongoClient } from "mongodb";
import styles from "../styles/Home.module.css";
import MeetupList from "../components/meetups/MeetupList";


const Dummy_Meetups = [
  {
    id: "m1",
    title: "A first",
    image:
      "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "address, 1, 2nd street, city",
    description: "this is a second meetup",
  },
  {
    id: "m2",
    title: "A second",
    image:
      "https://images.pexels.com/photos/3859774/pexels-photo-3859774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "address, 1, 2nd street, city",
    description: "this is a second meetup",
  },
];

export default function Home(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);

  //   useEffect(() => {
  //     setLoadedMeetups(Dummy_Meetups);
  //   }, []);

  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="browse a list of various meetup places"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jaswanthsai:e2Bh0ImaaFIPSIil@cluster0.bp8sumr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsc = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetupsc.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(){
//     const req=context.req;
//     const res=context.res;
//     return{
//         props:{
//             meetups:Dummy_Meetups
//         }
//     };
// }

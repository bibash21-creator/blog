import StaffPicks from "./newsfeed_comp/StaffPicksComp";
import Sidebar from "@/app/feed/components/newsfeed_comp/Sidebar"
import MainHero from "@/app/feed/components/newsfeed_comp/MainHero"
import Recommendation from "@/app/feed/components/newsfeed_comp/Recommendation"
import FollowList from "@/app/feed/components/newsfeed_comp/FollowList"
import ReadList from "@/app/feed/components/newsfeed_comp/ReadList"
export default function NewsFeed(){
    return (
        <>
        
        <div className="flex">
        <Sidebar />

        <MainHero />

        <div className="flex flex-col">
 <StaffPicks />

        <Recommendation />


        <FollowList/>


        <ReadList />
        </div>


       

        </div>
      
        
        
        
        </>

    )
}
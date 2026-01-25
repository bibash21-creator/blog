export default function MainHero(){
    return(
        <>
            <section className="hero-padding border-r border-grey-500">
                <div className="flex space-x-10 border-b border-grey-500">
                    <div className="">
                    For you
                    </div>


                <div className="">
                    Featured
                </div>
                </div>  


                {/* Articles */}
                <div className="p-5 border border-green-500">
                    <span className="head">In data Science Collective by Marina Wyss - Gratitude Driven</span>
                    <h1 className="tedxt-3xl font-bold">AI Agents: Complete Course</h1>
                    <p className="text-xl">From begineer to immediate to production.</p>

                </div>
                
            </section>
        </>
    )
}

export default function BandwidthService(auth:any, setBandwidthCdn : any ,setBandwidthPeertopeer : any, setIsLoaded : any , setError : any) {
   
    const bandwidthRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "session_token": auth, from : "1509490800000", to : "1510826400000" }),
      };
      fetch("http://localhost:3000/bandwidth", bandwidthRequest)
      .then((res) => res.json())
      .then(
        (result) => {
          setBandwidthCdn(result.cdn);
          setBandwidthPeertopeer(result.p2p);
          setIsLoaded(true);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    
}

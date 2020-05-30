import BandwidthService from "./bandwidth-service";


function AuthService(setError:any, setIsLoaded:any, setAuth:any, setBandwidthCdn : any, setBandwidthPeertopeer : any) {
    console.log('ok')
    var sessionToken = '';
    const authRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiant: "swagtv", password: "bling$bling" }),
      };
      fetch("http://localhost:3000/auth", authRequest)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setAuth(result.session_token);
            sessionToken = result.session_token;
            BandwidthService(sessionToken, setBandwidthCdn, setBandwidthPeertopeer, setIsLoaded, setError);
             
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
          
        
}

export default AuthService


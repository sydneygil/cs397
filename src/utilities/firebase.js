// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKq2_hXgjmmngDWLFiPcK16Vu455paNv4",
    authDomain: "cs397-5b5fa.firebaseapp.com",
    databaseURL: "https://cs397-5b5fa-default-rtdb.firebaseio.com",
    projectId: "cs397-5b5fa",
    storageBucket: "cs397-5b5fa.appspot.com",
    messagingSenderId: "487582522150",
    appId: "1:487582522150:web:c55f2156371ff549323fe7",
    measurementId: "G-SMPZJBWVS7"
  };

  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };
import { createContext } from 'react';

const TestSessionContext = createContext(undefined);

export default TestSessionContext;

// export const TestSessionProvider = (props) => {
//   const [ testSession, setTestSession ] = useState(
//     {
//       videos: [
//         {
//           path: './data/video/sample_1.mp4',
//           rating: null
//         },
//         {
//           path: './data/video/sample_2.mp4',
//           rating: null
//         },
//         {
//           path: './data/video/sample_3.mp4',
//           rating: null
//         },
//         {
//           path: './data/video/sample_4.mp4',
//           rating: null
//         }
//       ],
//       currentVideoId: 0
//     }
//   );
//
//   return (
//     <TestSessionContext.Provider value={[testSession, setTestSession]}>
//       {props.children}
//     </TestSessionContext.Provider>
//   );
// };
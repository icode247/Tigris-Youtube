import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
palette: {
   primary: {
      main: '#556cd6',
   },
   secondary: {
     main: '#19857b',
   },
   error: {
   main: red.A400,
   },
  },
});
export default theme;
@emotion/cache configuration.
The second config/createEmotionCache.tsx file created is in your root level. The config/createEmotionCache.tsx file handles all material UI-related cache in your nextjs app.

import createCache from '@emotion/cache';

export default function createEmotionCache() {
   return createCache({ key: 'css', prepend: true });
}
Pro tip
Always use material UI with nextjs. then make sure in your project nextjs _document.js file is available.

References
https://mui.com/material-ui/getting-started/overview/
https://www.npmjs.com/package/@emotion/react
https://www.npmjs.com/package/@emotion/styled
Conclusion
I hope my article solves your problem. In this article, I do not describe the theory part. I will tell you only the coding region.

If you inserted to learn more about everything related to pasting code in _app.js file. Then check out the references.

You can follow and read more articles on officialrajdeepsingh.dev and tag them on Twitter.

Read More content on the Nextjs. Sign up for a free newsletter and join the nextjs community on medium.

Nextjs
Material Ui
Nextjs With Material Ui
Material Ui Configuration
19






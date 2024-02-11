import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/lora';
import '@fontsource-variable/montserrat';

const theme = extendTheme({
  fonts: {
    heading: `'Lora', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
})

export default theme
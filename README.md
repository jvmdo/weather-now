# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screencast](#screencast)
  - [Live preview](#live-preview)
- [My process](#my-process)
  - [Step-by-step](#step-by-step)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Remaining questions](#remaining-questions)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

#### Beyond the challenge

- Local filtering results by city/country

### Screencast

![Another one bites the dust](./screencast.gif)

### Live preview

- Live Site URL: [Weather Now live on Netlify](https://weather-now-jvmdo.netlify.app/)
- Solution URL: [Solution on Frontend Mentor](https://www.frontendmentor.io/solutions/search-input-using-autocomplete-component-with-filtering-RXUDZEj2nt)

## My process

### Step by step

1. Define theme tokens. For that, you need to match the provided colors and the colors in design. Use a color picker tool.
    - Terrible task! It took me almost 2 hours. Frankly...

2. Init Vite project, setup absolute imports and editor support

3. How to use local fonts in Vite? What is that "i" in font weight? Setup fonts
    - Well... I ignored variable fonts

4. Basic markup
    - Including dedicated components (select, search field)
  
5. Search feature: geocoding
    - Understanding how `cmdk` works
    - Implementing own filtering logic using Fuse.js
    - Integrate Tanstack Query
    - Throttle input
    - Small refactoring
    - Change to Autocomplete component after spending hours on `cmdk` because you finally realized it is not the right tool for the job

6. Search feature: weather data
    - Set query for weather data based on lat/lng returned from city search
    - SRP components: search and dashboard
    - Display data
      - Set place (city, country) callback
      - Hourly and daily map builders
      - Weather code mapper
    - Dynamic units through context
    - Componentization

7. Styling
    - Default
    - Loading and error
    - Mobile-first workflow
    - Responsiveness

8. Make sure everything is working as expected. If don't, fix them.

### Built with

- React.js
- Tanstack Query
- Tanstack Pacer
- Radix UI
- Base UI
- match-sorter
- day.js
- react-error-boundary

### What I learned

- Setup static variables in Vite is dead simple: place them under public, declare `@font-face{}` and use by their set family name
  - `@font-face{}`'s `url format()` issue. I had to remove this declaration

- `cmdk`'s `useCommandState` should return what you want, NOT what you need to derive what you want. Perform calculations inside the hook, then return the result.

- Tanstack Query will refetch an already cached key on mount because `staleTime=0` by default.

- How to throttle user input. Tanstack Pacer comes to rescue for that. `useThrottledValue` and friends are handy!
  - It's even possible to dynamically turn off wait time or completely disable the hook during render. Setting `wait` to `0` will turn throttling off, which means the hook returns on every key stroke; setting `enabled` to `false` will halt the hook, which means it will not return.

- Muitos dos problemas que tive durante a implementação do componente de busca provavelmente se deve ao fato de eu ter duas filtragens: a primeira feita pela API; a segunda, localmente. Por exemplo, a sequência de estados `vazio -> loading -> vazio`. Minha suposição é que o primeiro vazio é local enquanto o segundo é da API. Encontrar localmente e ainda sim recarregar a lista após resposta da API não é um bom UX.
  - Talvez integrar a filtragem local com o recurso otimista do Tanstack Query?

- `useQuery` structural sharing: references to `data` will not change unless the fetcher function returns a different JSON. `data` is a safe dependency for memoization.

- Remember: CSS modules only scope classes, not elements!

- Maybe reset focus border is a good idea. Then set your customs not in hover.

- Remember: `:first-child` pseudo-class targets the element itself, not its children. If you want to select the first child, you should space like `div :first-child`

- `cmdk`'s `item` value should be a string otherwise won't work.

- Remember: `position: absolute` keep the element where it would be, but it will no longer occupy space since it is taken out of the regular flow. However, the absolute child is still within its parent. In cases where parents are flex/grid, its absolute child will be under those layouts! It is even possible to `order` absolute flex items!!!

- Don't lose your mind dealing with sizes: some property is same on both mobile and desktop? Set this shit explicitly!!!

- getQueryFodase retorna o valor na render e apenas, sem notificar sobre futuras mudanças. Para notificações, use QueryObserver + userQueryClient + useEffect

- Query will cause `react-error-boundary` to create an infinite loop if `throwOnError` is `true` because query will thrown on every render after the first error. Then, boundary will retry again... Tanstack provide a component and a hook to reset the error state of queries.

- Do not apply global layout styles in `body` otherwise overlay components will be buggy. It happened that `popover` were messing with the app padding previously set on `body`. Same for `#root`. Use the app wrapper instead.

- Combobox = Select with text filter. cmdk = fancy combobox. Autocomplete = Input for free-form text. Autocomplete is the ideal component for searching form.

- Be careful with Dayjs tokens...

- THROTTLE DESVINCULA O QUE a ação do usuário e o estado monitorado pelo período de tempo determinado. Ou seja, durante esse período, o estado do input não é o mesmo do valor monitorado. Isso me causou muitos problemas na renderização da lista de resultados e dos estados (loading, empty, error). A solução foi criar a flag `isTyping = searchTerm !== throttledSearchTerm`. E daí, derivar o `isLoading = isTyping | isPending`. Isso resolveu o empty e blank glicth no autocomplete. Both `leading` and `trailing` properties should be `true` otherwise `isTyping` will never be.

- Muito cuidado com `placeholderData (keepPreviousData)`. Essa porra não é ativada por padrão e me causou MUITOS PROBLEMAS. `data` é `undefined` enquanto um novo fetch é feito. Por isso, a lista de resultados some enquanto `loading`.

- `status` won't be `pending` after first fetch if there is `placeholderData`. `isPending` if only if there is no cached data. In those cases, use `isFetching` instead.

### Remaining questions

- Como identificar termos na string de busca sem acabar com UX e DX? Não acredito ser boa prática depender do input correto do usuário (no caso, separar termos por vírgula), mas é o que tá feito aí.

- Why the heck there is an empty state flickering if I do not disabled throttle?

  ```js
  const [throttledSearchTerm] = useThrottledValue(searchTerm, {
      wait: searchTerm.includes(",") ? 0 : 1000, // Disabled for local filtering
      enabled: () => isFetchEnabled, // Prevent empty state flashing *why?*
    });
  ```

- Ways of clamping or reducing font size in hero title based on available space?

- Why filtering does not work for the first search? Everything is fine from 2nd on.
  - I think `isPlaceholderData && isTyping` fixed that!

### Useful resources

- [Never call `new Date()` inside your components](https://kyleshevlin.com/never-call-new-date-inside-your-components) - Otherwise you will break its purity.

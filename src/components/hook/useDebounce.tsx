import { useEffect, useState } from 'react'
import { OurAddress } from 'src/graphql-definition/webinfo-service.generated'

function useDebounce(value: any, delay: any) {

  const [debounceValue, setDebounceValue] = useState<string[]>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(handler) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])


  return debounceValue
}

export default useDebounce

import { useRouter, useRoute } from 'vue-router'

export function useUrlManager() {
  const router = useRouter()
  const route = useRoute()

  const getQueryParams = () => {
    return {
      baseId: route.query.baseId ? Number(route.query.baseId) : null,
      quoteId: route.query.quoteId ? Number(route.query.quoteId) : null,
    }
  }

  const updateQueryParams = (baseId: number, quoteId: number) => {
    router.push({
      query: {
        ...route.query,
        baseId,
        quoteId,
      },
    })
  }

  return {
    getQueryParams,
    updateQueryParams,
  }
}

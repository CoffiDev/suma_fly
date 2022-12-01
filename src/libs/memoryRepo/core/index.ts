export const inMemoryRepo = <T extends { id: number; uuid: string }>(
  initialRepo: T[] = []
) => {
  const repo = [...initialRepo]

  const getAll = async () => repo

  const create = async (item: Omit<T, "id" | "uuid">) => {
    const id = repo.length + 1
    const uuid = Math.round(Math.random() * 8).toString() // fake uuid

    const n = { ...item, id, uuid }
    repo.push(n as T)
    return n
  }

  const remove = async (uuid: string) => {
    const itemIndex = repo.findIndex(({ uuid: itemUUID }) => uuid === itemUUID)

    if (itemIndex < 0) {
      return { found: false }
    } else {
      repo.splice(itemIndex, 1)
      return { found: true }
    }
  }

  const update = async (
    uuid: string,
    update: Partial<Omit<T, "id" | "uuid">>
  ) => {
    const index = repo.findIndex(({ uuid: itemUUID }) => uuid === itemUUID)

    if (index < 0) {
      return { found: false, item: null } as const
    } else {
      repo[index] = { ...repo[index], ...update }
      return { found: true, item: repo[index] } as const
    }
  }

  return { getAll, create, remove, update }
}

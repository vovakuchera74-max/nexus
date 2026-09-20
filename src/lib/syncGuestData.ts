import type { SupabaseClient } from '@supabase/supabase-js'
export async function syncCartToAccount(
  supabase:SupabaseClient,
  userId: string,
  cartItems: { id: string; quantity: number }[]
) {
  await supabase.from('cart_items').delete().eq('user_id', userId)

  if (cartItems.length > 0) {
    const rows = cartItems.map((item) => ({
      user_id: userId,
      product_id: item.id,
      quantity: item.quantity,
    }))
    await supabase.from('cart_items').upsert(rows, { onConflict: 'user_id,product_id' })
  }
}

export async function syncWishlistToAccount(
  supabase: SupabaseClient,
  userId: string,
  wishlistItems: { id: string }[]
) {
  await supabase.from('wishlist_items').delete().eq('user_id', userId)

  if (wishlistItems.length > 0) {
    const rows = wishlistItems.map((item) => ({
      user_id: userId,
      product_id: item.id,
    }))
    await supabase.from('wishlist_items').upsert(rows, { onConflict: 'user_id,product_id' })
  }
}

type MergedCartItem = { id: string; quantity: number; [key: string]: any  }

export async function mergeCartOnLogin(
  supabase: SupabaseClient,
  userId: string,
  localItems: MergedCartItem[]
) {
  const { data: dbRows } = await supabase
    .from('cart_items')
    .select('quantity, product:products(*)')
    .eq('user_id', userId)

  const merged = new Map<string, MergedCartItem>()

  for (const row of dbRows ?? []) {
  const product = Array.isArray(row.product) ? row.product[0] : row.product
  if (product) {
    merged.set(product.id, { ...product, quantity: row.quantity })
  }
}

  for (const item of localItems) {
    const existing = merged.get(item.id)
    if (existing) {
      merged.set(item.id, { ...existing, quantity: existing.quantity + item.quantity })
    } else {
      merged.set(item.id, item)
    }
  }

  const mergedArray = Array.from(merged.values())

  if (mergedArray.length > 0) {
    const rows = mergedArray.map((item) => ({
      user_id: userId,
      product_id: item.id,
      quantity: item.quantity,
    }))
    await supabase.from('cart_items').upsert(rows, { onConflict: 'user_id,product_id' })
  }

  return mergedArray
}
type MergedWishlistItem = { id: string; [key: string]: any  }

export async function mergeWishlistOnLogin(
  supabase: SupabaseClient,
  userId: string,
  localItems: MergedWishlistItem[]
) {
  const { data: dbRows } = await supabase
    .from('wishlist_items')
    .select('product:products(*)')
    .eq('user_id', userId)

  const merged = new Map<string, MergedWishlistItem>()

  for (const row of dbRows ?? []) {
    const product = Array.isArray(row.product) ? row.product[0] : row.product
    if (product) {
      merged.set(product.id, product)
    }
  }

  for (const item of localItems) {
    if (!merged.has(item.id)) {
      merged.set(item.id, item)
    }
  }

  const mergedArray = Array.from(merged.values())

  if (mergedArray.length > 0) {
    const rows = mergedArray.map((item) => ({
      user_id: userId,
      product_id: item.id,
    }))
    await supabase.from('wishlist_items').upsert(rows, { onConflict: 'user_id,product_id' })
  }

  return mergedArray
}
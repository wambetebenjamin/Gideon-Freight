export type DeliveryStatus = 'Booked' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered'
export type Delivery = {
  id: string; reference: string; pickupAddress: string; pickupCounty: string; pickupContact: string; pickupPhone: string; pickupTime: string
  deliveryAddress: string; deliveryCounty: string; recipientName: string; recipientPhone: string; deliveryInstructions?: string
  size: 'envelope' | 'small parcel' | 'large parcel' | 'freight'; weight: number; declaredValue: number; fragile: boolean; serviceType: 'same-day' | 'next-day' | 'bulk'
  cost: number; status: DeliveryStatus; createdAt: string; estimatedDelivery: string; courier: { name: string; phone: string }; proofUrl?: string
}

const deliveries: Delivery[] = [{
  id: 'gf-demo-001', reference: 'GF-NAI-84219', pickupAddress: 'Westlands Road, Nairobi', pickupCounty: 'Nairobi', pickupContact: 'Samuel Kariuki', pickupPhone: '0712345678', pickupTime: 'Morning',
  deliveryAddress: 'Moi Avenue, Nakuru', deliveryCounty: 'Nakuru', recipientName: 'Grace Wanjiru', recipientPhone: '0798765432', deliveryInstructions: 'Call on arrival', size: 'small parcel', weight: 2, declaredValue: 3500, fragile: false, serviceType: 'next-day', cost: 600, status: 'In Transit', createdAt: '2026-10-20T09:00:00.000Z', estimatedDelivery: '2026-10-23T15:00:00.000Z', courier: { name: 'Kevin M.', phone: '0712123456' },
}, {
  id: 'gf-demo-002', reference: 'GF-NAI-84220', pickupAddress: 'Ngong Road, Nairobi', pickupCounty: 'Nairobi', pickupContact: 'Faith N.', pickupPhone: '0700000000', pickupTime: 'Afternoon',
  deliveryAddress: 'Kilimani, Nairobi', deliveryCounty: 'Nairobi', recipientName: 'Mercy K.', recipientPhone: '0700000001', size: 'envelope', weight: .2, declaredValue: 1200, fragile: false, serviceType: 'same-day', cost: 250, status: 'Delivered', createdAt: '2026-10-18T09:00:00.000Z', estimatedDelivery: '2026-10-18T16:00:00.000Z', courier: { name: 'Esther W.', phone: '0701123456' }, proofUrl: '/images/kenyan-portrait-4.png',
}]

export function getDeliveryByReference(reference: string) { return deliveries.find((delivery) => delivery.reference.toUpperCase() === reference.trim().toUpperCase()) }
export function getDeliveryById(id: string) { return deliveries.find((delivery) => delivery.id === id) }
export function getRecentDeliveries() { return [...deliveries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) }
export function createDelivery(input: Omit<Delivery, 'id' | 'reference' | 'cost' | 'status' | 'createdAt' | 'estimatedDelivery' | 'courier'>) {
  const base = input.serviceType === 'same-day' ? 250 : input.serviceType === 'next-day' ? 600 : 2500
  const reference = `GF-${input.pickupCounty.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 89999)}`
  const record: Delivery = { id: `gf-${crypto.randomUUID()}`, reference, cost: base + Math.max(0, input.weight - 1) * 50, status: 'Booked', createdAt: new Date().toISOString(), estimatedDelivery: new Date(Date.now() + (input.serviceType === 'same-day' ? 8 : 30) * 60 * 60 * 1000).toISOString(), courier: { name: 'Assigning courier', phone: '0712000000' }, ...input }
  deliveries.unshift(record)
  return record
}

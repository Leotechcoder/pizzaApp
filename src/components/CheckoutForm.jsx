import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Edit2,
  Trash2,
  X,
  CreditCard,
  Banknote,
  Truck,
  Store,
} from "lucide-react"

import { idGenerator } from "../shared/utils/idGenerator"
import { createOrder } from "../orders/application/orderSlice"
import { clearCart } from "../orders/application/cartSlice"

function CheckoutForm({ isOpen, onClose }) {
  if (!isOpen) return null

  const dispatch = useDispatch()

  const [customerInfo, setCustomerInfo] = useState({
    nombre: "",
    telefono: "",
  })

  const [paymentMethods, setPaymentMethods] = useState([])
  const [deliveryType, setDeliveryType] = useState("local")
  const [deliveryAddress, setDeliveryAddress] = useState("")

  const cartItems = useSelector((state) => state.cart.items)
  const total = useSelector((state) => state.cart.total)

  /* =========================
     HANDLERS
  ========================= */

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    )
  }

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type)
    if (type === "local") setDeliveryAddress("")
  }

  const handleCreateOrder = () => {
    if (!cartItems.length) return

    const paymentAmounts = {
      efectivo: "",
      credito: "",
      debito: "",
    }

    paymentMethods.forEach((method) => {
      paymentAmounts[method] = String(total)
    })

    const orderPayload = {
      userId: idGenerator("User"),
      userName: customerInfo.nombre || "Invitado",
      phone: customerInfo.telefono || "",
      status: "pending",

      items: cartItems.map((item) => ({
        id: idGenerator("Item"),
        productId: String(item.id),
        productName: item.name,
        description: item.description || "",
        unitPrice: String(item.price),
        quantity: Number(item.quantity) || 1,
      })),

      totalAmount: Number(total),

      paymentInfo: {
        methods: paymentMethods,
        amounts: paymentAmounts,
      },

      deliveryType,
      deliveryAddress: deliveryType === "delivery" ? deliveryAddress : "",
    }

    dispatch(createOrder(orderPayload))
    dispatch(clearCart())
  }

  /* =========================
     RENDER HELPERS
  ========================= */

  const renderItemDetails = (item) => {
    const quantity = Number(item.quantity) || 1
    const price = Number(item.price) || 0
    const subtotal = price * quantity

    return (
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-900">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-xs text-gray-500">
            {item.description}
          </p>
        )}

        {item.size && (
          <p className="text-xs">
            Tamaño: <span className="font-medium">{item.size}</span>
          </p>
        )}

        {item.pizzaType && (
          <p className="text-xs">
            Tipo: <span className="font-medium">{item.pizzaType}</span>
          </p>
        )}

        {Array.isArray(item.extras) && item.extras.length > 0 && (
          <p className="text-xs">
            Extras:{" "}
            <span className="font-medium">
              {item.extras.join(", ")}
            </span>
          </p>
        )}

        {item.additionalComments && (
          <p className="text-xs italic text-gray-500">
            “{item.additionalComments}”
          </p>
        )}

        <p className="text-xs">Cantidad: {quantity}</p>

        <p className="text-xs font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </p>
      </div>
    )
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative h-full w-full overflow-y-auto bg-gray-50">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 shadow hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* ================= FORMULARIO ================= */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Completa con tus datos
              </h2>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    value={customerInfo.nombre}
                    onChange={handleCustomerChange}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    name="telefono"
                    value={customerInfo.telefono}
                    onChange={handleCustomerChange}
                    placeholder="Tu teléfono"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>

              {/* Pago */}
              <div className="mb-8 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Métodos de Pago
                </h3>

                {["efectivo", "credito", "debito"].map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={paymentMethods.includes(method)}
                      onChange={() =>
                        handlePaymentMethodChange(method)
                      }
                      className="h-5 w-5 accent-orange-500"
                    />

                    {method === "efectivo" && (
                      <Banknote className="h-4 w-4 text-orange-500" />
                    )}
                    {method !== "efectivo" && (
                      <CreditCard className="h-4 w-4 text-orange-500" />
                    )}

                    <span className="text-sm capitalize">
                      {method}
                    </span>
                  </label>
                ))}
              </div>

              {/* Entrega */}
              <div className="mb-8 space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Tipo de Entrega
                </h3>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === "local"}
                    onChange={() =>
                      handleDeliveryTypeChange("local")
                    }
                    className="h-5 w-5 accent-orange-500"
                  />
                  <Store className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Recoger en Local</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === "delivery"}
                    onChange={() =>
                      handleDeliveryTypeChange("delivery")
                    }
                    className="h-5 w-5 accent-orange-500"
                  />
                  <Truck className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Delivery</span>
                </label>

                {deliveryType === "delivery" && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Dirección de Entrega
                    </label>
                    <input
                      value={deliveryAddress}
                      onChange={(e) =>
                        setDeliveryAddress(e.target.value)
                      }
                      placeholder="Tu dirección"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ================= RESUMEN ================= */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Carrito
              </h2>

              <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">

                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Tu carrito está vacío.
                  </p>
                ) : (
                  <>
                    {cartItems.map((item) => {
                      const imageUrl =
                        item.image ||
                        item.images?.[0]?.url ||
                        "/placeholder.png"

                      return (
                        <div
                          key={item.cartId ?? item.id}
                          className="flex gap-4 border-b pb-4"
                        >
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />

                          {renderItemDetails(item)}

                          <div className="flex flex-col gap-2">
                            <button
                              className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100 transition"
                              title="Editar"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>

                            <button
                              className="rounded-lg border border-gray-200 p-2 hover:bg-red-50 transition"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    <div className="border-t pt-4">
                      <p className="text-lg font-bold">
                        Total: ${Number(total).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={handleCreateOrder}
                      className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600 transition"
                    >
                      Generar Orden
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm

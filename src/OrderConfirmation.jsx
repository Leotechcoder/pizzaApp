import { MessageCircle, CheckCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { clearCurrentOrder } from "./orders/application/orderSlice"

export default function OrderConfirmation({ order, onClose }) {
  const dispatch = useDispatch()

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, realicé un pedido a nombre de ${order.userName}.
Orden: ${order.id}.`
    )

    const phone = "5491123456789"

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank"
    )

    dispatch(clearCurrentOrder())
    onClose()
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">

      <div className="mb-6 flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <h2 className="text-xl font-semibold">
          Pedido generado con éxito
        </h2>
      </div>

      {/* FACTURA */}
      <div className="space-y-3 rounded-xl border p-4 text-sm">
        <p><b>Orden:</b> {order.id}</p>
        <p><b>Cliente:</b> {order.userName}</p>
        <p><b>Total:</b> ${order.totalAmount}</p>
        <p><b>Estado:</b> {order.status}</p>
        <p>
          <b>Entrega:</b>{" "}
          {order.deliveryType === "local"
            ? "Retiro en local"
            : "Delivery"}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 space-y-3 text-center">
        <p className="text-sm text-gray-600">
          Para finalizar el proceso, confirmá tu pedido vía WhatsApp
        </p>

        <button
          onClick={handleWhatsApp}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-semibold text-white hover:bg-green-600 transition"
        >
          <MessageCircle className="h-5 w-5" />
          Ir al chat
        </button>
      </div>
    </div>
  )
}

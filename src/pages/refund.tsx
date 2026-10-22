export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 sm:p-12 rounded-2xl border border-gray-800 shadow-2xl">
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Refund and Cancellation Policy
        </h1>
        <p className="text-[#83B70F] font-medium mb-8">
          Effective date: 20 May 2026
        </p>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-400">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. General</h2>
            <p>This Refund and Cancellation Policy explains when and how customers of Untangled IT Solutions ("we", "us", "our") may request a refund or cancel an order placed through our website. This policy should be read together with our Terms and Conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Physical Products</h2>
            
            <h3 className="font-bold text-gray-200 mt-4 mb-2">2.1 Returns</h3>
            <p className="mb-2">If you are not satisfied with a physical product purchased from us, you may request a return within 7 (seven) days of delivery, provided that:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>the product is unused and in its original packaging; and</li>
              <li>all accessories, manuals and documentation are included; and</li>
              <li>you can provide proof of purchase (invoice or order confirmation).</li>
            </ul>
            <p>We reserve the right to inspect the returned product before approving a refund or replacement.</p>

            <h3 className="font-bold text-gray-200 mt-4 mb-2">2.2 Incorrect or damaged products</h3>
            <p>If you receive a product that is incorrect, damaged or defective on arrival, please notify us within 7 (seven) days of delivery. We will arrange for collection and, once the issue is confirmed, we will offer a replacement or refund, depending on stock availability and your preference.</p>

            <h3 className="font-bold text-gray-200 mt-4 mb-2">2.3 Non-returnable items</h3>
            <p>Certain items may not be eligible for return or refund for hygiene, licensing or other reasons. Where applicable, this will be clearly indicated on the product page or during checkout.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Return Procedure</h2>
            <p>To initiate a return, customers must contact us with their order number and reason for return. Once approved, we will provide return shipping instructions or arrange collection as applicable. Customers bear the cost of return shipping unless the return is due to our error or product defect.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Refund Processing</h2>
            <p>Refunds will be processed within 14 (fourteen) business days of the returned product being received and inspected. Refunds will be credited to the original payment method used at purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Order Cancellations</h2>
            <p>Customers may cancel an order before it has been dispatched. Cancellation requests must be made within 24 (twenty-four) hours of order placement. Once an order has been dispatched, cancellation may not be possible, and the customer would need to follow the returns procedure outlined above.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Digital Products and Services</h2>
            <p>Digital products and services (including software licenses and consulting services) are generally non-refundable once delivered or activated, unless there is a material fault or error on our part.</p>
          </section>

          <section className="pt-6 border-t border-gray-800 mt-8">
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
            <p>If you have questions about our Refund and Cancellation Policy or wish to request a return or cancellation, please contact us at <a href="mailto:sales@untangledits.co.za" className="text-[#83B70F] hover:underline">sales@untangledits.co.za</a> or call us on 011 664 6500.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
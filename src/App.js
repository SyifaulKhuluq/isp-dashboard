import React from "react";

const clients = [
  { id: 1, name: "Client A", quotaUsed: 35, quotaLimit: 100, dueDate: "2025-06-10", paid: true },
  { id: 2, name: "Client B", quotaUsed: 60, quotaLimit: 150, dueDate: "2025-06-15", paid: false },
  { id: 3, name: "Client C", quotaUsed: 80, quotaLimit: 100, dueDate: "2025-06-12", paid: true },
];

function ProgressBar({ used, limit }) {
  const percent = Math.min((used / limit) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className={`h-4 rounded-full ${percent > 80 ? "bg-red-500" : "bg-green-500"}`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

function ClientRow({ client }) {
  return (
    <tr className="border-b">
      <td className="py-2 px-4">{client.name}</td>
      <td className="py-2 px-4">
        <ProgressBar used={client.quotaUsed} limit={client.quotaLimit} />
        <div className="text-xs text-gray-600 mt-1">
          {client.quotaUsed} GB / {client.quotaLimit} GB
        </div>
      </td>
      <td className="py-2 px-4">{client.dueDate}</td>
      <td className="py-2 px-4">
        {client.paid ? (
          <span className="text-green-600 font-semibold">Paid</span>
        ) : (
          <span className="text-red-600 font-semibold">Unpaid</span>
        )}
      </td>
    </tr>
  );
}

export default function App() {
  const totalQuotaUsed = clients.reduce((acc, c) => acc + c.quotaUsed, 0);
  const totalQuotaLimit = clients.reduce((acc, c) => acc + c.quotaLimit, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-2">ISP Dashboard</h1>
        <p className="text-gray-700">
          Monitoring Kuota dan Tagihan Bulanan Client Internet
        </p>
      </header>

      <section className="max-w-6xl mx-auto mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Total Penggunaan Kuota</h2>
        <ProgressBar used={totalQuotaUsed} limit={totalQuotaLimit} />
        <div className="mt-2 text-gray-700 font-semibold">
          {totalQuotaUsed} GB dari {totalQuotaLimit} GB
        </div>
      </section>

      <section className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Client</h2>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Nama Client</th>
              <th className="py-2 px-4">Kuota Digunakan</th>
              <th className="py-2 px-4">Jatuh Tempo</th>
              <th className="py-2 px-4">Status Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

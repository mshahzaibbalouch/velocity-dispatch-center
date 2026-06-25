export const metadata = {
  title: "Velocity Dispatch Center",
  description: "A high-performance taxi dispatch dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

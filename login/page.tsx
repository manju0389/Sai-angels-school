export default function LoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Login Page</h1>

      <form>
        <input
          type="text"
          placeholder="Username"
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, Server } from "lucide-react"; // Import icons

function NotAllowed() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <Lock className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-gray-600">
            You do not have permission to view this page.
          </p>
        </div>
        <Button
          className="mt-8 w-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </main>
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-md">
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Button
          className="mt-8 w-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </main>
  );
}

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-md">
        <Lock className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-6xl font-bold text-gray-900">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>
        <Button
          className="mt-8 w-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </main>
  );
}

function ServerError() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 text-center shadow-md">
        <Server className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-6xl font-bold text-gray-900">500</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Server Error
        </h2>
        <p className="mt-2 text-gray-600">
          Something went wrong on our end. Please try again later.
        </p>
        <Button
          className="mt-8 w-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </main>
  );
}

export { NotAllowed, NotFound, Unauthorized, ServerError };

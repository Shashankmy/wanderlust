
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-9xl font-bold text-wanderlust-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Destination Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for seems to have wandered off on its own adventure.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-wanderlust-primary hover:bg-wanderlust-primary/90"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

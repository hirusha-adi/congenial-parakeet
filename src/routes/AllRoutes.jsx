import { Route, Routes } from "react-router-dom"
import { Home, PageNotFound } from "../pages"

const AllRoutes = () => {
    return (
        <>
            <Routes>
                {/* Main */}
                <Route path="/" element={<Home />} />

                {/* Errors - 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
};

export { AllRoutes }

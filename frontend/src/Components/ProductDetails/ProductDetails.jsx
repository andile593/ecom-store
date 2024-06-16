import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { similarProducts } = useSelector((state) => state.product)
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

   

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Empty Review", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    }

    const addToCartHandler = () => {
        if (!product) {
            enqueueSnackbar("Product not loaded yet", { variant: "error" });
            return;
        }
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const handleDialogClose = () => {
        setOpen(!open);
    }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (product?.category) {
            dispatch(getSimilarProducts(product.category));
        }
    }, [dispatch, product]);

    if (loading) {
        return <Loader />;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            {product && (
                <>
                    <MetaData title={product.name} />
                    <MinCategory />
                    <main className="mt-12 sm:mt-0">

                        {/* <!-- product image & description container --> */}
                        <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">

                            {/* <!-- image wrapper --> */}
                            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                {/* <!-- imgbox --> */}
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">
                                        <Slider {...settings}>
                                            {product.images && product.images.map((item, i) => (
                                                <img draggable="false" className="w-full h-96 object-contain" src={item.url} alt={product.name} key={i} />
                                            ))}
                                        </Slider>
                                        <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
                                        </div>
                                    </div>

                                    <div className="w-full flex gap-3">
                                        {/* <!-- add to cart btn --> */}
                                        {product.stock > 0 && (
                                            <button onClick={itemInCart ? goToCart : addToCartHandler} className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg">
                                                <ShoppingCartIcon />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button onClick={buyNow} disabled={product.stock < 1 ? true : false} className={product.stock < 1 ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg" : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"}>
                                            <FlashOnIcon />
                                            {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                        </button>
                                        {/* <!-- add to cart btn --> */}
                                    </div>

                                </div>
                                {/* <!-- imgbox --> */}
                            </div>
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <div className="flex-1 py-2 px-3">

                                {/* <!-- whole product description --> */}
                                <div className="flex flex-col gap-2 mb-4">

                                    <h2 className="text-xl">{product.name}</h2>
                                    {/* <!-- rating badge --> */}
                                    <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                                        <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{product.ratings && product.ratings.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} /></span>
                                        <span>{product.numOfReviews} Reviews</span>
                                    </span>
                                    {/* <!-- rating badge --> */}

                                    {/* <!-- price desc --> */}
                                    <span className="text-primary-green text-sm font-medium">Special Price</span>
                                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                                        <span className="text-gray-800">R{product.price?.toLocaleString()}</span>
                                        {product.discount && (
                                            <span className="text-gray-500 text-lg line-through">R{product.originalPrice?.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500">Inclusive of all taxes</div>
                                    {/* <!-- price desc --> */}

                                    {/* <!-- offer & desc --> */}
                                    <div className="text-sm text-gray-700 flex flex-col gap-1">

                                        <span className="flex items-center gap-1">
                                            <LocalOfferIcon sx={{ fontSize: "18px" }} />
                                            <span>Bank Offer10% off on ICICI Bank Credit Card</span>
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <LocalOfferIcon sx={{ fontSize: "18px" }} />
                                            <span>Special Price Get extra 20% off (price inclusive of discount)</span>
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <VerifiedUserIcon sx={{ fontSize: "18px" }} />
                                            <span>1 Year Manufacturer Warranty</span>
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <CachedIcon sx={{ fontSize: "18px" }} />
                                            <span>7 Days Replacement Policy</span>
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                                            <span>No cost EMI R5,999/month. Standard EMI also available</span>
                                        </span>

                                    </div>
                                    {/* <!-- offer & desc --> */}

                                </div>
                                {/* <!-- whole product description --> */}

                                <button onClick={handleDialogClose} className="bg-primary-yellow px-4 py-2 rounded-md shadow-sm text-sm font-medium">
                                    Add Review
                                </button>

                                <Dialog
                                    aria-labelledby="simple-dialog-title"
                                    open={open}
                                    onClose={handleDialogClose}
                                >
                                    <DialogTitle>Submit Review</DialogTitle>
                                    <DialogContent className="submitDialog">
                                        <Rating
                                            onChange={(e) => setRating(e.target.value)}
                                            value={rating}
                                            size="large"
                                        />

                                        <TextField
                                            label="Comment"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <button onClick={handleDialogClose} className="bg-gray-400 px-4 py-2 rounded-md shadow-sm text-sm font-medium">Cancel</button>
                                        <button onClick={reviewSubmitHandler} className="bg-primary-yellow px-4 py-2 rounded-md shadow-sm text-sm font-medium">Submit</button>
                                    </DialogActions>
                                </Dialog>

                            </div>
                            {/* <!-- product desc wrapper --> */}

                        </div>
                        {/* <!-- product image & description container --> */}

                        {/* <!-- similar products container --> */}
                        <div className="w-full bg-white sm:p-2">
                            <ProductSlider
                                title="Similar Products"
                                products={similarProducts}
                            />
                        </div>
                        {/* <!-- similar products container --> */}

                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;

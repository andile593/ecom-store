import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { REMOVE_PRODUCT_DETAILS, UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import BackdropLoader from '../Layouts/BackdropLoader';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";

const UpdateProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit } = useForm();

    const { loading, product, error } = useSelector((state) => state.productDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.product);


    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach(async (file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                }
            };

            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
            setImages((oldImages) => [...oldImages, { url: imageUrl }]);
            reader.readAsDataURL(file);
        });
    };

    
    const onSubmit = (data) => {
        data.images = images;
        dispatch(updateProduct(params.id, data));
    };

    const productId = params.id;

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
         } 
        // else {
        //     setName(product.name);
        //     setDescription(product.description);
        //     setPrice(product.price);
        //     setCuttedPrice(product.cuttedPrice);
        //     setCategory(product.category);
        //     setStock(product.stock);
        //     setWarranty(product.warranty);
        //     setBrand(product.brand.name);
        //     setHighlights(product.highlights);
        //     setSpecs(product.specifications);
        //     setOldImages(product.images);
        //     setLogoPreview(product.brand.logo.url);
        // }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Product Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch({ type: REMOVE_PRODUCT_DETAILS });
            navigate('/admin/products');
        }
    }, [dispatch, error, updateError, isUpdated, productId, product, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Product | Flipkart" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        {...register('name')}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        {...register('description')}
                    />
                    <div className="flex justify-between">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            {...register('price')}
                        />
                       
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            {...register('category')}
                        >
                            {categories.map((el, i) => (
                                <MenuItem value={el} key={i}>
                                    {el}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            {...register('stock')}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 m-2 sm:w-1/2">

                    <h2 className="font-medium">Product Images</h2>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                        {/* {oldImages && oldImages.map((image, i) => (
                            <img draggable="false" src={image.url} alt="Product" key={i} className="w-full h-full object-contain" />
                        ))} */}
                        {imagesPreview.map((image, i) => (
                            <img draggable="false" src={image} alt="Product" key={i} className="w-full h-full object-contain" />
                        ))}
                    </div>
                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleProductImageChange}
                            className="hidden"
                        />
                        Choose Files
                    </label>

                    <div className="flex justify-end">
                        <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Update" />
                    </div>

                </div>

            </form>
        </>
    );
};

export default UpdateProduct;
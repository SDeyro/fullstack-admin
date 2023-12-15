import React from "react";
import { Box, useMediaQuery, Skeleton } from "@mui/material";

import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import ProductCard from "components/ProductCard";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(useGetProductsQuery());
  console.log("🚀 ~ file: index.jsx:22 ~ Products ~ data:", data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your product list." />

      {data || !isLoading ? (
        <Box
          mt="20px"
          pb="1.5rem"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <ProductCard
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height="80vh"
          sx={{ mt: "20px", pb: "1.5rem" }}
        />
      )}
    </Box>
  );
};

export default Products;

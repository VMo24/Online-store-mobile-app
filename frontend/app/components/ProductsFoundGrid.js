import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useQuery, gql } from "@apollo/client";

import ProductCard from "./ProductCard";
import Constants from "../config/constants";

function favToggle(arg) {
	console.log("fav for card set to ", arg);
}

function mapDataArray(arr) {
	if (arr.length == 0) return;
	return arr.map((item) => (
		<ProductCard
			key={item.slug}
			style={{ ...styles.productCard }}
			onToggleFav={favToggle}
			Title={item.title}
			Description={item.description}
			Image={{ uri: Constants.serverUrl + item.image.url }}
			Price={item.price}
		/>
	));
}

function splitDataOnColumns(data) {
	let column1 = [];
	let column2 = [];
	data.products.forEach((item, index) => {
		if (index % 2 == 0) column1.push(item);
		else column2.push(item);
	});
	return (
		<React.Fragment>
			<View style={styles.productsColumn}>
				<Text style={styles.resultText}>
					Found{"\n"}
					{data.products.length} {data.products.length == 1 ? "product" : "products"}
				</Text>
				{mapDataArray(column1)}
			</View>
			<View style={styles.productsColumn}>{mapDataArray(column2)}</View>
		</React.Fragment>
	);
}

const ProductsFoundGrid = (props) => {
	const PRODUCTS = gql`
	query GetProducts {
		products(where:{title_contains:"${props.searchTerm}"}) {
			slug
			title
			description
			image {
				url
			}
			price
		}
	}
	`;
	const { loading, error, data } = useQuery(PRODUCTS);
	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>A problem has occured.</Text>;
	return <View style={styles.products}>{splitDataOnColumns(data)}</View>;
};

const styles = StyleSheet.create({
	products: { paddingLeft: 15, marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-between" },
	productsColumn: { width: "47.5%" },
	productCard: { marginBottom: 20 },
	resultText: { fontWeight: "700", width: 200, fontSize: 28, marginBottom: 15 },
});

export default ProductsFoundGrid;

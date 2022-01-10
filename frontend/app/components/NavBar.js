import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableHighlight } from "react-native";
import validURL from "../utils/validURL";

class Navbar extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.root}>
				<TouchableHighlight underlayColor='#ffffff66' onPress={() => this.props.navigation.navigate(this.props.backLocation)} style={styles.backButtonWrapper}>
					<Image style={styles.backButton} source={require("../assets/icons/left-arrow.png")} />
				</TouchableHighlight>
				<View style={styles.NavbarTitle}>
					<Text style={styles.NavbarTitleText}>{this.props.title}</Text>
				</View>
				<ContextItem context={this.props.context} />
			</View>
		);
	}
}

const ContextItem = (props) => {
	if (props.context.type === "profile")
		return (
			<View style={{ ...styles.contextItem, ...styles.profileImageContext }}>
				<Image
					style={styles.profile}
					source={{
						uri: props.context.profileImage,
					}}
				/>
			</View>
		);
	else if (props.context.type === "menu") {
		return (
			<TouchableHighlight underlayColor='#ffffff66' onPress={() => alert("hi")} style={{ ...styles.contextItem, ...styles.menuContext }}>
				<Image style={styles.menu} source={require("./../assets/icons/menu.png")} />
			</TouchableHighlight>
		);
	} else if (props.context.type === "cart") {
		return (
			<TouchableHighlight underlayColor='#ffffff66' onPress={() => alert("hi")} style={{ ...styles.contextItem, ...styles.menuContext }}>
				<Image style={styles.menu} source={require("./../assets/icons/bag.png")} />
			</TouchableHighlight>
		);
	}
};

const styles = StyleSheet.create({
	root: {
		height: 60,
		display: "flex",
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	backButtonWrapper: {
		display: "flex",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		left: 7.5,
		alignSelf: "center",
	},
	menuContext: {
		display: "flex",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		alignSelf: "center",
	},
	backButton: {
		height: 18,
		width: 18,
	},
	NavbarTitle: { alignSelf: "center" },
	NavbarTitleText: {
		fontWeight: "700",
		fontSize: 17,
	},
	contextItem: {
		height: 40,
		width: 40,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		right: 20,
		borderRadius: 5,
		alignSelf: "center",
	},
	profile: {
		height: 40,
		width: 40,
	},
	menu: {
		height: 25,
		width: 25,
	},
});

export default Navbar;
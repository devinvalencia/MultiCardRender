import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-card";

const data = require("./idealData.json");

const view = (state, { updateState }) => {
	const { properties } = state;

	return (
		<div>
			{properties.records.map((record) => (
				
				<now-card
					size="lg"
					interaction="none"
					sidebar={{ color: "positive", variant: "primary" }}
					key={record}
				>
					<now-card-header
						tagline={{ label: `${record.property.propertyName}` }}
						heading={{ label: `${record.property.currentValue} vs ${record.property.newValue}`, size: "md", lines: 2 }}
						caption={{ label: "Select Choice", lines: 2 }}
					></now-card-header>
					<now-card-actions
						items={[
							{ label: "Keep Current", icon: "thumbs-up-outline" },
							{ label: "Overwrite Current", icon: "pencil-outline" },
							{ label: "Merge", icon: "download-outline" },
						]}
					></now-card-actions>
				</now-card>
			))}
		</div>
	);
};

createCustomElement("x-772283-scope-multicardrender", {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		records: {
			default: data,
		},
	},
});

/**
 * Need to return JSON data in different format where each object in array includes new and old value properties (as well as associated record number)
 * For each property in first object, add newValue property
 * For newValue property, include property object of the original property in that one
 */
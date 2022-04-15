import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-card";

// Disable before updating for UI builder
const data = require("./idealData.json");


// 4-15 : Included selectedField in payload
const testFunc = (label, {dispatch}) => {
	// updateProperties({currentField: `${record.property.propertyName}`});
	if (label == 'Merge') {
		dispatch('ACTION_NAME_A');
	} else if (label == 'Overwrite Current') {
		dispatch('ACTION_NAME_B');
	}
};

// 4-15 : Update selectedField property on click
const view = (state, { updateState}) => {
	const { properties} = state;

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
						heading={{ label: `${record.property.currentDisplayValue} vs ${record.property.newDisplayValue}`, size: "md", lines: 2 }}
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

// Remote default from records property before putting into ui builder
createCustomElement("x-772283-scope-multicardrender", {
	view,
	styles,
	renderer: { type: snabbdom },
	properties: {
		records: {
			default: data
		},
		selectedField: {}
	},

	// 4-15 : Register Actions in now-ui.json
	actions: {
		'ACTION_NAME_A': {},
		'ACTION_NAME_B': {}
	},
	actionHandlers: {
		'NOW_CARD_ACTIONS#ACTION_CLICKED': (coeffects) => {
			// console.log(`${coeffects.action.payload.action.label}`);
			testFunc(coeffects.action.payload.action.label,coeffects);
		},
		'ACTION_NAME_A' : () => console.log('Situation A'),
		'ACTION_NAME_B' : () => console.log('Situation B')
	}
});

/**
 * Need to return JSON data in different format where each object in array includes new and old value properties (as well as associated record number)
 * For each property in first object, add newValue property
 * For newValue property, include property object of the original property in that one
 */
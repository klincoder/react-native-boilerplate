// Import resources
import React, { useState } from "react";
import { View, Modal, FlatList, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

// Import custom files
import colors from "../config/colors";
import useCustomModalState from "../hooks/useCustomModalState";
import CustomButton from "./CustomButton";
import CustomFormErrMsg from "./CustomFormErrMsg";
import CustomListItem from "./CustomListItem";

// Component function
function CustomFormSelect({
  items,
  name,
  title,
  description,
  iconLeft,
  iconRight,
  defaultValue,
  isInput,
  placeholder,
  btnAddNewItem,
  ...rest
}) {
  // Define modal state
  const { hideModal, showModal, modalVisible } = useCustomModalState();

  // Define formik context
  const { errors, setFieldValue, touched, values } = useFormikContext();

  // Define state
  const [filterInput, setFilterInput] = useState();

  // FUNCTIONS
  // HANDLE FILTER ITEMS

  // Return component
  return (
    <>
      {/** TOUCHABLE OPACITY */}
      <TouchableOpacity activeOpacity={0.5} onPress={showModal}>
        {/** LIST ITEMS CONTAINER */}
        <View style={tw`mb-10`}>
          {/** If isInput */}
          {isInput ? (
            <View>
              {/** Input */}
              <TextInput
                left={iconLeft && <TextInput.Icon name={iconLeft} />}
                style={tw`bg-[${colors.lightgrey}]`}
                placeholder={
                  values[name]?.label ? values[name]?.label : placeholder
                }
                disabled={true}
                {...rest}
              />
            </View>
          ) : (
            <View style={tw`bg-[${colors.lightgrey}]`}>
              {/** If an item is selected, show it */}
              {/** If not, show defaultValue */}
              <CustomListItem
                iconLeft={iconLeft}
                iconRight={iconRight}
                title={
                  values[name]?.label
                    ? values[name]?.label
                    : defaultValue
                    ? defaultValue
                    : title
                }
                description={
                  values[name]?.label
                    ? title
                    : defaultValue
                    ? title
                    : description
                }
              />
            </View>
          )}

          {/** Error message */}
          <CustomFormErrMsg error={errors[name]} visible={touched[name]} />
        </View>
      </TouchableOpacity>

      {/** MODAL */}
      {/** Show or hide modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={hideModal}
      >
        {/** Action buttons */}
        <View style={btnAddNewItem && tw`flex-row`}>
          {/** Close */}
          <CustomButton
            isNormal
            mode="contained"
            icon="close"
            onPress={hideModal}
            style={btnAddNewItem && tw`w-1/2`}
          >
            Close
          </CustomButton>

          {/** Add new */}
          {btnAddNewItem && (
            <CustomButton
              isNormal
              mode="contained"
              icon="plus"
              onPress={btnAddNewItem}
              // style={btnAddNewItem && [tw`w-1/2`, { backgroundColor: colors.secondary }]}
              style={btnAddNewItem && tw`w-1/2 bg-[${colors.secondary}]`}
            >
              Add New
            </CustomButton>
          )}

          {/** Search filter */}
          {/* <TextInput
            //left={icon && <TextInput.Icon name={icon} />}
            label="Filter"
            mode="outlined"
            value={filterInput}
            onChangeText={(e) => setFilterInput(e)}
          /> */}
        </View>

        {/** List items */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <>
              <CustomListItem
                title={item.label}
                iconLeft={item?.image ? item?.image : "arrow-right"}
                onPress={() => {
                  hideModal();
                  setFieldValue(name, item);
                  // Debug
                  //console.log("Debug customFormSelect: ", item);
                }}
              />
            </>
          )}
        />
      </Modal>
    </>
  );
}

// Export component
export default CustomFormSelect;

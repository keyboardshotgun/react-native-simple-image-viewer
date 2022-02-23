import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: { padding: 0, margin: 0 },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: 0,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnLeftHand: {
    position: 'absolute',
    top: 52,
    left: 0,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailBorder: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemContainer: {
    height: '100%',
    flexWrap: 'wrap',
    overflow: 'hidden',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingTop: 15,
  },
});

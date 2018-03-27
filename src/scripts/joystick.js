export const BUTTONS = Object.freeze({
  SWITCH_Y       : 0x01,
  SWITCH_B       : 0x02,
  SWITCH_A       : 0x04,
  SWITCH_X       : 0x08,
  SWITCH_L       : 0x10,
  SWITCH_R       : 0x20,
  SWITCH_ZL      : 0x40,
  SWITCH_ZR      : 0x100,
  SWITCH_MINUS   : 0x200,
  SWITCH_PLUS    : 0x400,
  SWITCH_LCLICK  : 0x800,
  SWITCH_RCLICK  : 0x1000,
  SWITCH_HOME    : 0x2000,
  SWITCH_CAPTURE : 0x4000,
})

export class Joystick {
  constructor (output) {
    // output just something can write.
    this.out = output;
    this.HardReset();
    this.Reset();
  }

  Reset() {
    const buf = new Uint8Array(1)
    buf[0] = 0xC0
    this.out.write(buf);
  }

  HardReset() {
    const buf = new Uint8Array(1)
    buf[0] = 0xFF
    this.out.write(buf);
  }

  setButtons(buttons) {
    const buf = new Uint8Array(3)
    buf[0] = 0x80
    buf[1] = buttons & 0x7F
    buf[2] = (buttons >>> 8) & 0x7F
    this.out.write(buf)
  }

  setHat(direction) {
    const buf = new Uint8Array(1)
    buf[0] = 0x90 + direction & 0x0F
    this.out.write(buf)
  }

  setLeftStick(x, y) {
    const buf = new Uint8Array(3)
    buf[0] = 0xA0 + (x & 0x80 ? 0x04 : 0) + (y & 0x80 ? 0x01 : 0)
    buf[1] = x & 0x7F
    buf[2] = y & 0x7F
    this.out.write(buf)
  }

  setRightStick(x, y) {
    const buf = new Uint8Array(3)
    buf[0] = 0xB0 + (x & 0x80 ? 0x04 : 0) + (y & 0x80 ? 0x01 : 0)
    buf[1] = x & 0x7F
    buf[2] = y & 0x7F
    this.out.write(buf)
  }
}

Joystick.BUTTONS = BUTTONS

export default Joystick;
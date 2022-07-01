class RSA{
  constructor() {}

  findRandomPrime(p){
      const min = 300;
      const max = 999;
      for (;;) {
        const i = Math.floor(Math.random() * max) + min;
        if (this.isPrime(i) && i != p) {
            return i;
        }
      }
  }

  isPrime(num){
    if(num % 2 == 0) {
        return false;
    }
    
    for(let i = 3; i <= Math.ceil(Math.sqrt(num)); i = i + 2) {
        if(num % i == 0)
            return false;
    }
    return true;
  }

  compute_n(p, q){
    return p * q;
  }

  eular_z(p, q){
    return (p - 1) * (q - 1);
  }

  find_e(z){
    for(let i = 2; i < z; i++){
      if(this.coprime(i, z)){
        return i;
      }
    }
  }

  gcd(e, z){
      if (e == 0 || z == 0){
          return 0;
      }

      if (e == z){
          return e;
      }

      if (e > z){
          return this.gcd(e - z, z);
      }

      return this.gcd(e, z - e);
  }

  coprime(e, z){
      if (this.gcd(e, z) == 1){
        return true;
      }
      return false;
  }

  find_d(e, z) {
    for(let d=1;;d++){
      if(((d * e) % z) == 1){
        return d;
      }
    }
  }

  encrypt(m, e, n){
    let c = "";
    let newChar = "";
    let everySeparate = "";
    for(let i = 0; i < m.length; i++){
      newChar = bcpowmod(m.charCodeAt(i), e, n);
      everySeparate+=newChar.length;
      c+=newChar;
    }
    return array(c, everySeparate);
  }
}

class DiffieHellman{
  constructor() { }

  findRandomPrime(min, max){
    for (;;) {
      const i = Math.floor(Math.random() * max) + min;
      if (this.isPrime(i)) {
          return i;
      }
    }
  }

  isPrime(num){
    if(num % 2 == 0) {
        return false;
    }

    for(let i = 3; i <= Math.ceil(Math.sqrt(num)); i = i + 2) {
        if(num % i == 0)
            return false;
    }
    return true;
  }

  mpmod(base, exponent, modulus) {
    if ((base < 1) || (exponent < 0) || (modulus < 1)) {
        return ("invalid");
    }
    let result = 1;
    while (exponent > 0) {
        if ((exponent % 2) == 1) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent = Math.floor(exponent / 2);
    }
    return (result);
  }

  findPrimitives(theNum) {
    var o = 1;
    var k;
    var roots = new Array();
    var z = 0;
    
    for (var r = 2; r < theNum; r++) {
      k = Math.pow(r, o);
      k %= theNum;
      while (k > 1) {
        o++;
        k *= r;
        k %= theNum;
      }
      if (o == (theNum - 1)) {
        roots[z] = r;
        z++;
      }
      o = 1;
    }

    return roots;
  }
}

class Gamal{

  __construct() {}

  findRandomPrime(){
    const min = 299;
    const max = 999;
    for (;;) {
      const i = Math.floor(Math.random() * max) + min;
      if (this.isPrime(i)) {
          return i;
      }
    }
  }

  isPrime(num){
    if(num % 2 == 0) {
        return false;
    }

    for(let i = 3; i <= Math.ceil(Math.sqrt(num)); i = i + 2) {
        if(num % i == 0)
            return false;
    }
    return true;
  }

  mpmod(base, exponent, modulus) {
    if ((base < 1) || (exponent < 0) || (modulus < 1)) {
        return ("invalid");
    }
    let result = 1;
    while (exponent > 0) {
        if ((exponent % 2) == 1) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent = Math.floor(exponent / 2);
    }
    return (result);
  }

  findPrimitives(theNum) {
    var o = 1;
    var k;
    var roots = new Array();
    var z = 0;
    
    for (var r = 2; r < theNum; r++) {
      k = Math.pow(r, o);
      k %= theNum;
      while (k > 1) {
        o++;
        k *= r;
        k %= theNum;
      }
      if (o == (theNum - 1)) {
        roots[z] = r;
        z++;
      }
      o = 1;
    }

    return roots;
  }

  encrypt(q, a, ya, message){
    var ciphers = new Object();
    let everySeparate = "";

    let k1 = Math.floor(Math.random() * q - 1) + 2;
    let k2 = this.mpmod(ya, k1, q);
    let c1 = this.mpmod(a, k1, q);
    let c2 = "";

    for(let i = 0; i < message.length; i++){
      let currentChar = message.charCodeAt(i);
      let currentc2 = (k2 * parseInt(currentChar)) % q;
      c2 += currentc2;
      everySeparate += String(currentc2).length;
    }
    
    ciphers[0] = c1;
    ciphers[1] = c2;
    ciphers[2] = everySeparate;
    return ciphers;
  }

  decrypt(c1, c2, xa, q, everySeparate){
    let m = "";
    let k2 = this.mpmod(c1, xa, q);
    let k2Inverse = this.modInverse(k2, q);
    
    for(let i = 0, ct = 0; i < String(c2).length; i+=parseInt(everySeparate[ct]), ct++){
      m += this.getTheCurrentChar(String(c2), i, parseInt(everySeparate[ct]), k2Inverse, q);
    }
    return m;
  }

  getTheCurrentChar(c, from, to, k2Inverse, q){
    let current = "";
    for(let i = 0, j = from; i < to; i++, j++){
      current += c[j];
    }
    // alert(current);
    return String.fromCharCode(parseInt((k2Inverse * current) % q));
  }

  modInverse(a, m){
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
  }
}

// let gamal = new Gamal();
// let q = gamal.findRandomPrime();
// let proots = gamal.findPrimitives(q);
// let prootsLength = gamal.findPrimitives(q).length;
// let a = proots[Math.floor(Math.random() * prootsLength)];
// let xa = Math.floor(Math.random() * q - 1) + 2;
// let ya = gamal.mpmod(a, xa, q);
// let ciphers = gamal.encrypt(q, a, ya, "Gamal");
// let c1 = ciphers[0];
// let messageText = ciphers[1]; // c2
// let es = ciphers[2];
// let d = gamal.decrypt(c1, messageText, xa, q, es);
// alert(d);

